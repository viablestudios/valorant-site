"use client";
import { useState } from "react";
import Image from "next/image";
import { useStoreUI } from "@/components/store/StoreUI";
import { useCurrency } from "@/components/store/CurrencyProvider";
import { Sheet } from "@/components/ui/Sheet";
import styles from "./PathToImmortal.module.css";

const screens = [
  { id: "dashboard", label: "Your dashboard", title: "Log in with a purpose.", text: "Your rank. Your next lesson. Your focus for today. Open your dashboard and get straight to the work that matters.", points: ["A weekly focus for your rank", "Warm-ups and a daily training session", "Pre-queue checklist and post-game reflections"] },
  { id: "strats", label: "Strats & lineups", title: "Make your utility count.", text: "Pick your map. Pick your agent. Find a lineup you can actually use, then save it for your next session.", points: ["Browse video lineups by map and agent", "Keep your favourites in Saved", "Current lineup library awaiting coach review"] },
  { id: "maps", label: "Know your maps", title: "Read the map. Own the round.", text: "Know where the fights happen, what space matters and how each side wins. Give your next rotation a reason.", points: ["Visual map layouts", "Attacking and defending ideas", "Map knowledge open to every rank"] },
  { id: "progress", label: "Track your climb", title: "See the work add up.", text: "Turn “I played all week” into progress you can point to. Follow your lessons, rank checks and milestones in one place.", points: ["Track lessons across eight skill areas", "Rank checks and a final review", "Reflections, milestones and course completion"] },
];
const extras = [
  ["94 lessons. One clear path.", "Short lessons from Iron to Immortal on aim, movement, positioning, game sense, utility, teamplay, economy and mental habits. Revisit anything in your lesson library."],
  ["Train before you queue.", "Timed warm-ups, focused drills, deathmatch goals and a pre-queue checklist turn good intentions into a repeatable routine."],
  ["Practise the hard decisions.", "Daily questions and rank-specific scenarios, five at a time, explain why tempting answers fall short. Build your streak while training your judgement."],
  ["Keep what you learn.", "Save lesson notes, log post-game problems, reflect on your sessions and track badges and milestones. Your next session starts with what the last one taught you."],
  ["Finish with proof of your work.", "Complete your rank paths, graduation checks and final review. The course certificate requires coach approval and proof of Immortal rank."],
  ["Find a Duo — in preview.", "Filter profiles by rank, region and role, then copy a Riot ID to add in Valorant. This feature currently uses sample profiles; live player matching is not yet available."],
];

export function PathToImmortal({ price }: { price: number }) {
  const { openProduct } = useStoreUI();
  const { formatPrice } = useCurrency();
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const screen = screens[active];
  return (
    <section id="about" className={styles.section} aria-labelledby="path-heading">
      <div className={styles.hero}>
        <div className={styles.art} aria-hidden="true"><Image src="/images/course/jett-hero-hq.webp" alt="" fill sizes="100vw" quality={95} /></div>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>PEAKFORM PRESENTS / PATH TO IMMORTAL</p>
          <h2 id="path-heading">Your next rank.<br /><span>Starts here.</span></h2>
          <p className={styles.lead}>You’ve put in the hours.<br />Now give them a direction.</p>
          <p className={styles.pitch}>The lessons, strats and daily plan to turn another night of ranked into a session that moves your game forward.</p>
          <button className={styles.cta} onClick={() => openProduct("the-climb-bundle")}>Get Path to Immortal <span>{formatPrice(price)} ↗</span></button>
          <p className={styles.access}>Lifetime access <span>·</span> One payment <span>·</span> 3 personal devices</p>
        </div>
        <div className={styles.artCaption}><span>LESS AUTOPILOT.</span><strong>MORE INTENT.</strong></div>
      </div>
      <div className={styles.inside}>
        <div className={styles.insideHead}>
          <div><p className={styles.eyebrow}>TAKE A LOOK INSIDE</p><h3>This is your new pre-game.</h3></div>
          <p>Pick a tool. See what changes.</p>
        </div>
        <div className={styles.console}>
          <div className={styles.toolList} role="tablist" aria-label="Explore the course tools" aria-orientation="vertical">
            {screens.map((item, index) => {
              const on = active === index;
              return (
                <div key={item.id} className={styles.tool} data-on={on || undefined}>
                  <button id={`tour-tab-${item.id}`} role="tab" aria-selected={on} aria-controls={`tour-panel-${item.id}`} tabIndex={on ? 0 : -1} className={styles.toolHead} onClick={() => setActive(index)} onKeyDown={(event) => { if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? screens.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + screens.length) % screens.length; setActive(next); document.getElementById(`tour-tab-${screens[next].id}`)?.focus(); } }}>
                    <span className={styles.ico} aria-hidden="true">{["◈", "⌖", "◇", "↗"][index]}</span>{item.label}
                  </button>
                  <div id={`tour-panel-${item.id}`} role="tabpanel" aria-labelledby={`tour-tab-${item.id}`} hidden={!on} className={styles.toolBody}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                    <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
                  </div>
                </div>
              );
            })}
          </div>
          <figure className={styles.shotWrap}>
            <div className={styles.shot}>
              <button className={styles.imageButton} aria-label={`Enlarge ${screen.label} preview`} onClick={() => setExpanded(true)}>
                <Image key={screen.id} className={styles.fade} src={`/images/course/tour-${screen.id}.webp`} alt={`Path to Immortal ${screen.label} screen`} width={1800} height={1125} unoptimized sizes="(max-width: 900px) 100vw, 640px" />
              </button>
              <figcaption><span>PRODUCT PREVIEW · {screen.label.toUpperCase()}</span><button onClick={() => setExpanded(true)}>↗ Enlarge</button></figcaption>
            </div>
          </figure>
        </div>
      </div>
      <div className={styles.loadout}>
        <div className={styles.loadHead}>
          <div><p className={styles.eyebrow}>THE FULL LOADOUT</p><h3>Less searching. <span>More improving.</span></h3><p>Free tips are everywhere. A clear way to use them is what’s missing. Get the structure to learn, practise, queue and review, together.</p></div>
          <div className={styles.loadAct}><button className={styles.cta} onClick={() => openProduct("the-climb-bundle")}>Make your next session count <span>↗</span></button><small>Better habits take practice. No rank is guaranteed.</small></div>
        </div>
        <div className={styles.loadGrid}>{extras.map(([title, text]) => <article key={title} className={styles.loadCard}><h4>{title}</h4><p>{text}</p></article>)}</div>
      </div>
      <Sheet open={expanded} onClose={() => setExpanded(false)} label={`${screen.label} preview`} width={1200} header={<strong>{screen.label}</strong>}><Image src={`/images/course/tour-${screen.id}.webp`} alt={`Enlarged ${screen.label} product preview`} width={2479} height={1591} unoptimized sizes="100vw" style={{width:"100%",height:"auto"}} /><p>Path to Immortal · {screen.label} · Product preview</p></Sheet>
    </section>
  );
}
