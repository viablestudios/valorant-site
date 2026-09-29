"use client";
import { useState } from "react";

/**
 * "Tap a habit to fix it." Each row shows a habit most players recognise; tapping it
 * strikes the habit through, opens the fix underneath and wins a round pip. Edit the pairs below.
 */
const habits: { habit: string; fix: string }[] = [
  {
    habit: "Warm-up? Maybe one deathmatch if there's time.",
    fix: "Ten minutes in the range, then one deathmatch where you only care about crosshair placement.",
  },
  {
    habit: "Lose pistol round? Mental gone.",
    fix: "It's one round and you need thirteen. Reset, buy with your team and play the next one properly.",
  },
  {
    habit: "Miss an easy shot? Change sensitivity again.",
    fix: "Keep your sens. Ask where your crosshair was before the fight started. That's usually the miss.",
  },
  {
    habit: "Teammate makes one bad play? Full essay in team chat.",
    fix: "Make one useful call instead, like where the enemy was last seen, and play your own round.",
  },
  {
    habit: "Lose, then straight back into another game hoping it goes better.",
    fix: "Rewatch one round you lost, write down one thing to fix, then queue.",
  },
];

export function HabitFlip({ intro }: { intro: React.ReactNode }) {
  const [fixed, setFixed] = useState<boolean[]>(() => habits.map(() => false));
  const count = fixed.filter(Boolean).length;
  const all = count === habits.length;
  const toggle = (i: number) => setFixed((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="habit-layout">
      <div className="habit-side">
        {intro}
        {/* Round-win pips, like the in-game HUD: one per habit fixed */}
        <div className="habit-pips" aria-live="polite">
          <div className="habit-pip-row" aria-hidden="true">
            {fixed.map((f, i) => (
              <span key={i} className={`habit-pip${f ? " is-won" : ""}`} />
            ))}
          </div>
          <p>
            {all ? (
              <strong>All five fixed. That&apos;s a better session already.</strong>
            ) : (
              <>
                <strong>{count}</strong> of {habits.length} habits fixed
              </>
            )}
          </p>
        </div>
        <button className="text-button" onClick={() => setFixed(habits.map(() => !all))}>
          {all ? "Reset" : "Fix them all"}
        </button>
      </div>

      <ol className="habit-rows">
        {habits.map((h, i) => (
          <li key={h.habit}>
            <button className={`habit-row${fixed[i] ? " is-fixed" : ""}`} onClick={() => toggle(i)} aria-expanded={fixed[i]}>
              <span className="habit-mark" aria-hidden="true" />
              <span className="habit-body">
                <span className="habit-bad">{h.habit}</span>
                <span className="habit-fix-wrap">
                  <span className="habit-fix">{h.fix}</span>
                </span>
              </span>
              <span className="habit-action">{fixed[i] ? "Fixed" : "Fix it"}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
