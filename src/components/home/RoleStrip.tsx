"use client";

import Image from "next/image";
import { useStoreUI } from "@/components/store/StoreUI";
import styles from "./RoleStrip.module.css";

const roles = [
  { role: "Duelist", image: "/images/agents/reyna.webp", agent: "Reyna", quip: "You entry. You frag. You occasionally die first and blame comms.", slug: "aim-foundations", pick: "Aim Foundations" },
  { role: "Initiator", image: "/images/agents/skye.webp", agent: "Skye", quip: "Information is your job. Please share it with the team.", slug: "game-sense-playbook", pick: "Game Sense Playbook" },
  { role: "Controller", image: "/images/agents/astra.webp", agent: "Astra", quip: "Smokes win rounds. Late smokes win memes.", slug: "the-ranked-mindset", pick: "The Ranked Mindset" },
  { role: "Sentinel", image: "/images/agents/vyse.webp", agent: "Vyse", quip: "Hold the site. Hold the angle. Hold your nerve.", slug: "crosshair-sensitivity-lab", pick: "Sensitivity Lab" },
];

export function RoleStrip() {
  const { openProduct } = useStoreUI();
  return (
    <section className={styles.section} aria-labelledby="roles-title">
      <div className="wrap">
        <div className={styles.head}>
          <p className="eyebrow">Pick your role</p>
          <h2 id="roles-title" className="h2">
            Main a role? <span className="serif">We&apos;ve got your starter.</span>
          </h2>
        </div>
        <ul className={styles.list}>
          {roles.map((r) => (
            <li key={r.role}>
              <button className={styles.tile} onClick={() => openProduct(r.slug)} aria-label={`${r.role}: start with ${r.pick}`}>
                <Image src={r.image} alt={`${r.agent} artwork`} fill sizes="(min-width: 900px) 25vw, 70vw" className={styles.img} />
                <span className={styles.shade} />
                <span className={styles.body}>
                  <span className={styles.role}>{r.role}</span>
                  <span className={styles.quip}>{r.quip}</span>
                  <span className={styles.pick}>
                    Start with {r.pick} <span aria-hidden="true">→</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
