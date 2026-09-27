import styles from "./SectionHeading.module.css";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  action,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  action?: React.ReactNode;
  id?: string;
}) {
  return (
    <header className={styles.head}>
      <div className={styles.text}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h2" id={id}>
          {title}
        </h2>
        {lede && <p className="lede">{lede}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </header>
  );
}
