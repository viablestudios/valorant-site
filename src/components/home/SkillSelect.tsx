"use client";
import Image from "next/image";
import { useState } from "react";
import { useStoreUI } from "@/components/store/StoreUI";

/**
 * "Pick your weakness", styled like agent select. Tap a skill to lock it in: it expands
 * with the signs you have that problem, one drill for tonight and the part of the Climb Bundle
 * that covers it. The other skills shrink to strips you can tap to switch. Edit below.
 */
const skills = [
  {
    title: "Aim",
    agent: "harbor",
    summary:
      "Build cleaner, more controlled mechanics so you're not relying on lucky flicks every round. Better tracking, better first shots and fewer moments where your crosshair ends up sightseeing.",
    signs: [
      "You lose duels where you got the first shot off.",
      "Your first bullet lands and the next three don't.",
      "You flick past heads more often than you hit them.",
    ],
    drill: "Ten minutes in the range: track bots at head height, then take 20 first-shot kills without moving.",
    guide: "Mechanics",
  },
  {
    title: "Crosshair Placement",
    agent: "cypher",
    summary:
      "Start putting your crosshair where the enemy is actually likely to be. Less dragging your aim halfway across the screen. More being ready before the fight even starts.",
    signs: [
      "You drag your crosshair across the screen to reach a head.",
      "Your crosshair sits on the floor or a wall while you walk.",
      "Enemies peek you and you're already a step behind.",
    ],
    drill: "Walk a map in a custom game and keep your crosshair at head height on every corner you pass.",
    guide: "Mechanics",
  },
  {
    title: "Decision Making",
    agent: "astra",
    summary:
      "Know when to push, when to hold, when to rotate and when to stop trying to be the hero. Better decisions make good aim far more useful.",
    signs: [
      "You're often the first one on your team to die.",
      "You rotate the moment you hear a single footstep.",
      "You chase kills after the round is already won or lost.",
    ],
    drill: "Before every round of your next game, decide one thing: where you're playing, and why.",
    guide: "Game Intelligence",
  },
  {
    title: "Consistency",
    agent: "brimstone",
    summary:
      "Stop having one great game followed by three disasters. Build routines, habits and a more reliable way to play so your performance doesn't depend on whether you “feel on it” that day.",
    signs: [
      "One 25-kill game, then two where you barely show up.",
      "Your aim feels different every time you play.",
      "One bad round and the rest of the match goes with it.",
    ],
    drill: "Do the same warm-up before every session for a week, and stop after two losses in a row.",
    guide: "The Climb",
  },
];

export function SkillSelect() {
  const { openProduct } = useStoreUI();
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={`skill-select${active !== null ? " has-pick" : ""}`}>
      {skills.map((s, i) => {
        const on = active === i;
        return (
          <article key={s.title} className={`skill-lane skill-lane--${s.agent}${on ? " is-locked" : ""}`}>
            <button
              className="skill-lane-pick"
              onClick={() => setActive(on ? null : i)}
              aria-expanded={on}
              aria-controls={`skill-detail-${s.agent}`}
            >
              <span className="skill-lane-art" aria-hidden="true">
                <Image
                  src={`/images/agents/crop/${s.agent}-hd.webp`}
                  alt=""
                  fill
                  quality={95}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </span>
              <span className="skill-lane-name">
                <span className="skill-lane-status">{on ? "Locked in" : "Pick"}</span>
                {s.title}
              </span>
            </button>

            <div className="skill-lane-detail" id={`skill-detail-${s.agent}`} hidden={!on}>
              <p className="skill-lane-summary">{s.summary}</p>
              <p className="skill-lane-label">You probably struggle with this if</p>
              <ul>
                {s.signs.map((sign) => (
                  <li key={sign}>{sign}</li>
                ))}
              </ul>
              <div className="skill-lane-drill">
                <p className="skill-lane-label">Try this tonight</p>
                <p>{s.drill}</p>
              </div>
              <div className="skill-lane-next">
                <p>
                  The full training plan is in <strong>{s.guide}</strong>, part of the Climb Bundle.
                </p>
                <button className="text-button" onClick={() => openProduct("the-climb-bundle")}>
                  See the Climb Bundle ↗
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
