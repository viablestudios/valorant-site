import Link from "next/link";
import styles from "./Button.module.css";

type Variant = "primary" | "outline" | "gold" | "ghost";
type Size = "md" | "lg" | "sm";

interface Common {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

type LinkProps = Common & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
type ButtonProps = Common & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", block, arrow, className, children, ...rest } = props;
  const cls = [styles.btn, styles[variant], styles[size], block && styles.block, className].filter(Boolean).join(" ");
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow && (
        <svg className={styles.arrow} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchor } = rest as LinkProps;
    // Downloads, hash links and API routes must bypass client-side routing
    if (anchor.download !== undefined || href.startsWith("#") || href.startsWith("/api/")) {
      return (
        <a href={href} className={cls} {...anchor}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...anchor}>
        {content}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
