import Link from "next/link";

/** Peakform mark: a summit chevron with a crosshair gap at the peak. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M2 27 13.2 7.5M18.8 7.5 30 27" stroke="#FF4655" strokeWidth="3.2" fill="none" strokeLinecap="square" />
      <path d="M9 27 16 15l7 12" stroke="#ECE8E1" strokeWidth="2" fill="none" opacity=".55" />
      <circle cx="16" cy="4.5" r="2" fill="#E6CD94" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" aria-label="Peakform home" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <LogoMark />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: 24,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        Peakform
      </span>
    </Link>
  );
}
