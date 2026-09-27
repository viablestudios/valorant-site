"use client";

import { useStoreUI } from "@/components/store/StoreUI";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./RankBand.module.css";

// A genuine sequence: each stage builds on the one before, so numbering carries meaning.
const path = [
  { name: "Aim", text: "Crosshair placement and clean first shots.", slug: "aim-foundations", cta: "Aim Foundations" },
  { name: "Mechanics", text: "Movement, stopping and sensitivity you trust.", slug: "crosshair-sensitivity-lab", cta: "Sensitivity Lab" },
  { name: "Game Sense", text: "Timings, info and decisions under pressure.", slug: "game-sense-playbook", cta: "Game Sense Playbook" },
  { name: "Consistency", text: "Routines and reviews that stop the rollercoaster.", slug: "vod-review-kit", cta: "VOD Review Kit" },
  { name: "Mindset", text: "Tilt control, confidence and knowing when to stop.", slug: "the-ranked-mindset", cta: "The Ranked Mindset" },
];

const benefits = [
  { title: "Instant Digital Access", text: "Pay, download, practise. Same session." },
  { title: "Built for Competitive Players", text: "Written for ranked, not for highlight reels." },
  { title: "Practical, Not Fluff", text: "We cut every chapter that explains what a crosshair is." },
  { title: "Affordable Improvement", text: "Less than a battle pass. More useful than a skin." },
];

export function RankBand() {
  const { openProduct } = useStoreUI();
  return (
    <section id="improve" className={styles.section} aria-labelledby="improve-title">
      <div className="wrap">
        <div className={styles.head}>
          <p className="eyebrow">Improve your rank</p>
          <h2 id="improve-title" className="h2">
            Queueing more isn&apos;t a strategy. <span className="outline">It&apos;s a hobby.</span>
          </h2>
          <p className="lede">
            Real improvement comes from working on the right skill in the right order. Here&apos;s the path, and the
            resource for each step.
          </p>
        </div>

        <ol className={styles.path}>
          {path.map((step, i) => (
            <Reveal as="li" key={step.name} delay={i * 80} className={styles.step}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.stepName}>{step.name}</h3>
              <p className={styles.stepText}>{step.text}</p>
              <button className={styles.stepLink} onClick={() => openProduct(step.slug)}>
                {step.cta} <span aria-hidden="true">→</span>
              </button>
            </Reveal>
          ))}
        </ol>

        <ul className={styles.benefits}>
          {benefits.map((b) => (
            <li key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
