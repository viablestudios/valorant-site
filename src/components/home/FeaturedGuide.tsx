"use client";

import Image from "next/image";
import { useStoreUI } from "@/components/store/StoreUI";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./FeaturedGuide.module.css";

const features = ["30+ pages", "Training routines", "Aim drills", "Match preparation", "Competitive mindset", "Mistake analysis", "Progress tracking"];

export function FeaturedGuide() {
  const { openProduct } = useStoreUI();
  return (
    <section className={styles.section} aria-labelledby="roadmap-title">
      <div className="wrap">
        <Reveal className={styles.panel}>
          <div className={styles.bgWord} aria-hidden="true">
            Immortal
          </div>
          <div className={styles.character} aria-hidden="true">
            <div className={styles.characterGlow}>
              <Image src="/images/characters/phoenix.webp" alt="" width={703} height={1800} sizes="(min-width: 900px) 30vw, 60vw" />
            </div>
          </div>

          <div className={styles.content}>
            <p className="eyebrow">Featured guide</p>
            <h2 id="roadmap-title" className={styles.title}>
              The Immortal <span className="serif">Roadmap</span>
            </h2>
            <p className={styles.sub}>A structured system for improving your mechanics, game sense and consistency.</p>
            <ul className={styles.features}>
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className={styles.buy}>
              <Price price={999} compareAt={1499} size={24} />
              <Button size="lg" variant="gold" arrow onClick={() => openProduct("the-immortal-roadmap")}>
                View Guide
              </Button>
            </div>
            <p className="quip">Side effects include a sudden urge to warm up before queueing.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
