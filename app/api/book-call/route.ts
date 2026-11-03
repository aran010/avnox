import { NextResponse } from "next/server";

interface BookingPayload {
  name: string;
  email: string;
  guests?: string;
  mobile: string;
  company: string;
  date: string;
  timeRange: string;
  timezone?: string;
  purpose?: string;
  timeline?: string;
  budget?: string;
  howFound?: string;
  referredBy?: string;
}

const RECIPIENT_EMAIL = "aranbhatteja@gmail.com";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingPayload;
    const {
      name,
      email,
      guests,
      mobile,
      company,
      date,
      timeRange,
      timezone,
      purpose,
      timeline,
      budget,
      howFound,
      referredBy,
    } = body;

    if (!name || !email || !date || !timeRange) {
      return NextResponse.json(
        { ok: false, error: "Name, email, date, and time are required." },
        { status: 400 },
      );
    }

    const subject = `New Avnox Intro Call — ${name} (${company || "Client"}) on ${date} at ${timeRange}`;
    const purposeText = purpose?.trim() ? purpose.trim() : "Not specified (optional)";
    const tzText = timezone || "India Standard Time";

    // 1. If RESEND_API_KEY is configured, send via Resend API
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "Avnox Bookings <onboarding@resend.dev>",
          to: [RECIPIENT_EMAIL],
          reply_to: email,
          subject,
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text',Helvetica,Arial,sans-serif;max-width:580px;margin:0 auto;padding:28px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;color:#1d1d1f;">
              <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#2563eb;font-weight:600;margin:0 0 8px;">Avnox — Intro Call Scheduled</p>
              <h2 style="font-size:22px;font-weight:600;margin:0 0 20px;">${name} booked a 30-min call</h2>
              <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;color:#6e6e73;font-size:13px;width:160px;">Date &amp; Time</td>
                  <td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;font-weight:600;">${timeRange}, ${date} (${tzText})</td>
                </tr>
                <tr>
                  <td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;color:#6e6e73;font-size:13px;">Name</td>
                  <td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;color:#6e6e73;font-size:13px;">Email</td>
                  <td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;"><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a></td>
                </tr>
                ${
                  guests?.trim()
                    ? `<tr><td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;color:#6e6e73;font-size:13px;">Guest Emails</td><td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;">${guests}</td></tr>`
                    : ""
                }
                <tr>
                  <td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;color:#6e6e73;font-size:13px;">Mobile Number</td>
                  <td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;">${mobile || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;color:#6e6e73;font-size:13px;">Company</td>
                  <td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;">${company || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;color:#6e6e73;font-size:13px;vertical-align:top;">Purpose of Work</td>
                  <td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;line-height:1.5;white-space:pre-wrap;">${purposeText}</td>
                </tr>
                ${
                  timeline?.trim()
                    ? `<tr><td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;color:#6e6e73;font-size:13px;">Target Timeline</td><td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;">${timeline}</td></tr>`
                    : ""
                }
                ${
                  budget?.trim()
                    ? `<tr><td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;color:#6e6e73;font-size:13px;">Budget</td><td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;">${budget}</td></tr>`
                    : ""
                }
                ${
                  howFound?.trim()
                    ? `<tr><td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;color:#6e6e73;font-size:13px;">How Found</td><td style="padding:11px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;">${howFound}${
                        referredBy?.trim() ? ` (${referredBy.trim()})` : ""
                      }</td></tr>`
                    : ""
                }
              </table>
            </div>
          `,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json({ ok: true });
      }
    }

    // 2. Fallback: FormSubmit AJAX endpoint -> sends to aranbhatteja@gmail.com in the background
    await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://avnoxsolutions.com",
        Referer: "https://avnoxsolutions.com/contact",
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        "Date & Time": `${timeRange}, ${date} (${tzText})`,
        Name: name,
        Email: email,
        "Guest Emails": guests?.trim() || "None",
        "Mobile Number": mobile || "Not provided",
        Company: company || "Not provided",
        "Purpose of Work (Optional)": purposeText,
        "Target Timeline": timeline?.trim() || "Not specified",
        Budget: budget?.trim() || "Not specified",
        "How did you find us?": howFound || "Not specified",
        "Referred By": referredBy?.trim() || "—",
      }),
    }).catch(() => null);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Booking submission error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not process booking request." },
      { status: 500 },
    );
  }
}
