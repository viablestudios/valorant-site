import type { CoverSpec } from "@/lib/types";
import { LogoMark } from "@/components/layout/Logo";
import styles from "./GuideCover.module.css";

const toneColor = { red: "#FF4655", gold: "#E6CD94", bone: "#ECE8E1" };

function Pattern({ pattern, color }: { pattern: CoverSpec["pattern"]; color: string }) {
  switch (pattern) {
    case "rings":
      return (
        <g fill="none" stroke={color}>
          {[18, 34, 50, 66, 82].map((r, i) => (
            <circle key={r} cx="150" cy="150" r={r} strokeOpacity={0.9 - i * 0.15} strokeWidth={i === 0 ? 2 : 1} />
          ))}
          <path d="M150 58v40M150 202v40M58 150h40M202 150h40" strokeWidth="2" />
        </g>
      );
    case "grid":
      return (
        <g stroke={color} strokeOpacity=".5">
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M${30 + i * 30} 40V260M30 ${40 + i * 27.5}H270`} strokeWidth=".8" />
          ))}
          <rect x="120" y="122" width="60" height="55" fill={color} fillOpacity=".15" stroke={color} strokeOpacity="1" strokeWidth="2" />
        </g>
      );
    case "peak":
      return (
        <g fill="none" stroke={color} strokeLinejoin="miter">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M${20 + i * 14} 250 L150 ${70 + i * 30} L${280 - i * 14} 250`} strokeOpacity={1 - i * 0.18} strokeWidth={i === 0 ? 2.5 : 1} />
          ))}
          <circle cx="150" cy="52" r="5" fill={color} stroke="none" />
        </g>
      );
    case "bars":
      return (
        <g fill={color}>
          {[40, 70, 55, 95, 80, 130, 110, 160].map((h, i) => (
            <rect key={i} x={40 + i * 28} y={250 - h} width="16" height={h} fillOpacity={0.25 + i * 0.09} />
          ))}
        </g>
      );
    case "stack":
      return (
        <g fill="none" stroke={color}>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={70 + i * 14} y={70 + i * 26} width={160 - i * 28} height="90" strokeOpacity={1 - i * 0.2} strokeWidth={i === 3 ? 2 : 1} transform={`skewX(-12)`} />
          ))}
        </g>
      );
  }
}

export function GuideCover({ cover, size = "md" }: { cover: CoverSpec; size?: "sm" | "md" | "lg" }) {
  const color = toneColor[cover.tone];
  return (
    <div className={`${styles.cover} ${styles[size]}`} style={{ "--tone": color } as React.CSSProperties} role="img" aria-label={`${cover.title} cover`}>
      <div className={styles.spine} />
      <svg className={styles.art} viewBox="0 0 300 300" aria-hidden="true">
        <Pattern pattern={cover.pattern} color={color} />
      </svg>
      <div className={styles.top}>
        <span>{cover.kicker}</span>
        <span>{cover.edition}</span>
      </div>
      <div className={styles.title}>{cover.title}</div>
      <div className={styles.foot}>
        <LogoMark size={16} />
        <span>Peakform</span>
      </div>
      <div className={styles.sheen} />
    </div>
  );
}
