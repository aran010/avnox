import Link from "next/link";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  const color = onDark ? "text-white" : "text-[#050505]";

  return (
    <Link href="/" className="inline-flex" aria-label="Avnox home">
      <span className={`text-[28px] font-bold leading-none tracking-[-1.4px] ${color}`}>avnox</span>
    </Link>
  );
}
