"use client";

import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

/** Centred pop-up dialog (as opposed to the side-sliding Sheet). Same a11y behaviour as Sheet. */
export function Modal({
  open,
  onClose,
  label,
  width = 480,
  header,
  footer,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  width?: number;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      const dialogs = Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"]')).filter((el) => !el.closest("[inert]"));
      if (dialogs[dialogs.length - 1] !== panelRef.current) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        const items = Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, select, textarea, [tabindex="0"]') ?? []
        ).filter((el) => el.getClientRects().length);
        const first = items[0],
          last = items[items.length - 1];
        if (!first) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div className={`${styles.root} ${open ? styles.open : ""}`} inert={!open}>
      <div className={styles.scrim} onClick={onClose} />
      <div className={styles.wrap}>
        <div
          ref={panelRef}
          className={styles.panel}
          style={{ width: `min(${width}px, 100%)` }}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          tabIndex={-1}
        >
          <div className={styles.head}>
            <div className={styles.headContent}>{header}</div>
            <button className={styles.close} onClick={onClose} aria-label={`Close ${label.toLowerCase()}`}>
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M3 3l12 12M15 3 3 15" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
          <div className={styles.body}>{children}</div>
          {footer && <div className={styles.foot}>{footer}</div>}
        </div>
      </div>
    </div>
  );
}
