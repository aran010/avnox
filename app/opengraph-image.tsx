import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Avnox — Enterprise IT & Talent, Delivered by One Partner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#f8fafc",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(37, 99, 235, 0.22) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(59, 130, 246, 0.16) 0%, transparent 50%)",
          color: "#0f172a",
          fontFamily: "-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="52" height="40" viewBox="0 0 245 193" fill="none">
            <path d="M0 193 L105 0 H192 L87 193 Z" fill="#0f172a" />
            <path d="M131 113 L148 80 H190 L245 193 H168 Z" fill="#2563eb" />
          </svg>
          <span style={{ fontSize: "40px", fontWeight: 700, letterSpacing: "-0.035em" }}>
            Avnox
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "920px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: "#0f172a",
            }}
          >
            Enterprise IT &amp; talent, delivered by one partner.
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: "26px",
              lineHeight: 1.4,
              color: "#475569",
            }}
          >
            IT Consulting · AI Solutions · Cloud Migration · Staffing · Software · Hardware
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #cbd5e1",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#2563eb",
            fontWeight: 600,
          }}
        >
          <span>avnoxsolutions.com</span>
          <span style={{ color: "#64748b", fontWeight: 500 }}>
            One accountable partner, end to end
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

