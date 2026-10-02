"use client";
import Image from "next/image";
import { useState } from "react";
import { useStoreUI } from "@/components/store/StoreUI";

/**
 * "Where are you stuck?" Pick your rank to see what usually holds players back there,
 * what to work on next and which Climb Bundle guide covers it. Edit the ranks below.
 */
const ranks: { name: string; stuck: string; focus: string[]; guide: string }[] = [
  {
    name: "Iron",
    stuck: "Most fights are lost before the first shot: crosshair aimed at the floor, and shooting while running.",
    focus: ["Keep your crosshair at head height while you move.", "Stop moving before you shoot."],
    guide: "Aim Foundations",
  },
  {
    name: "Bronze",
    stuck: "Peeking the same angle twice and dying with utility still in your pocket.",
    focus: ["After a kill, move to a new spot before the next fight.", "Use your utility before you peek, not after."],
    guide: "Aim Foundations",
  },
  {
    name: "Silver",
    stuck: "Winning duels but losing rounds, because everyone is playing a different game.",
    focus: ["Stay close enough to trade your teammate.", "Call where you died, every time."],
    guide: "Game Sense Playbook",
  },
  {
    name: "Gold",
    stuck: "Your aim is fine. Your economy isn't: random force buys and full buys nobody else matched.",
    focus: ["Buy with your team, even when it's a save.", "Learn what the enemy can afford next round."],
    guide: "Game Sense Playbook",
  },
  {
    name: "Platinum",
    stuck: "You're predictable. Same site, same timing, same peek, and better teams read it.",
    focus: ["Change your pace between rounds.", "Get information before you commit to a site."],
    guide: "Game Sense Playbook",
  },
  {
    name: "Diamond",
    stuck: "Mid-round calls: rotating too early, chasing kills and giving up space for nothing.",
    focus: ["Play for time and information, not just kills.", "Before each round, decide where you're playing and why."],
    guide: "Game Sense Playbook",
  },
  {
    name: "Ascendant",
    stuck: "Consistency. One great game, then two where you're not there mentally.",
    focus: ["Warm up the same way before every session.", "Set a stop rule for losing streaks and stick to it."],
    guide: "The Immortal Roadmap",
  },
  {
    name: "Immortal",
    stuck: "The margins are tiny now. Every small habit shows, good or bad.",
    focus: ["Copy the crosshair placement and timing of players above you.", "Tighten comms: short, early and useful."],
    guide: "Game Sense Playbook",
  },
];

export function RankFinder() {
  const { openProduct } = useStoreUI();
  const [active, setActive] = useState(2);
  const rank = ranks[active];

  return (
    <div className="rank-finder">
      <div className="rank-finder-picker" role="radiogroup" aria-label="Your current rank">
        {ranks.map((r, i) => (
          <button
            key={r.name}
            role="radio"
            aria-checked={i === active}
            className={`rank-chip${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <Image src={`/images/ranks/${r.name.toLowerCase()}-3.png`} alt="" width={64} height={64} />
            <span>{r.name}</span>
          </button>
        ))}
      </div>

      <div className="rank-finder-result" aria-live="polite" key={rank.name}>
        <div className="rank-finder-badge">
          <Image src={`/images/ranks/${rank.name.toLowerCase()}-3.png`} alt={`${rank.name} rank icon`} width={180} height={180} />
        </div>
        <div className="rank-finder-copy">
          <p className="rank-finder-label">Stuck in {rank.name}? Here&apos;s what usually holds players back</p>
          <p className="rank-finder-stuck">{rank.stuck}</p>
          <p className="rank-finder-label">Work on this next</p>
          <ul>
            {rank.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="rank-finder-next">
            <p>
              Covered in <strong>{rank.guide}</strong>, part of Path to Immortal: Guide.
            </p>
            <button className="text-button" onClick={() => openProduct("the-climb-bundle")}>
              See Path to Immortal: Guide ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
