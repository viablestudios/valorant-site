"use client";
import { useId, useState } from "react";
import { useStoreUI } from "@/components/store/StoreUI";

/**
 * "Switching to Valorant?" sensitivity converter. One job: turn another game's
 * sensitivity into the Valorant number that feels the same (same mouse, same DPI).
 * Maths: valorantSens = otherSens × otherYaw ÷ 0.07, using each game's degrees per mouse count.
 * Call of Duty assumes default settings (MW, Warzone, Black Ops). DPI only feeds the eDPI line.
 */
const games = [
  { id: "cs2", name: "CS2", yaw: 0.022, example: "1.2", unit: "" },
  { id: "apex", name: "Apex Legends", yaw: 0.022, example: "1.5", unit: "" },
  { id: "ow2", name: "Overwatch 2", yaw: 0.0066, example: "5", unit: "" },
  { id: "cod", name: "Call of Duty", yaw: 0.0066, example: "6", unit: "" },
  // Fortnite's X sensitivity is shown as a percentage, e.g. 8.0%
  { id: "fortnite", name: "Fortnite", yaw: 0.005555, example: "8", unit: "%" },
  { id: "tf2", name: "Team Fortress 2", yaw: 0.022, example: "2", unit: "" },
] as const;
const VAL_YAW = 0.07;

export function SensCheck() {
  const { openProduct } = useStoreUI();
  const id = useId();
  const [gameId, setGameId] = useState<(typeof games)[number]["id"]>("cs2");
  const [sens, setSens] = useState("1.2");
  const [dpi, setDpi] = useState("800");

  const game = games.find((g) => g.id === gameId)!;
  const value = parseFloat(sens);
  const valid = value > 0;
  const dpiN = parseFloat(dpi);
  const valSens = valid ? (value * game.yaw) / VAL_YAW : 0;
  const result = valid ? valSens.toFixed(3) : null;
  const edpi = valid && dpiN > 0 ? Math.round(valSens * dpiN) : null;

  return (
    <section id="about" className="sens-check page-pad" aria-labelledby="sens-heading">
      <div className="sens-intro">
        <h2 id="sens-heading">Switching to Valorant? Keep your aim.</h2>
        <p>Your old sensitivity number won&apos;t feel the same in Valorant. Pop it in here and we&apos;ll give you the one that does.</p>
      </div>

      <div className="sens-panel">
        <div className="sens-inputs">
          <div className="sens-field">
            <span id={`${id}-game`}>1. The game you&apos;re coming from</span>
            <div className="sens-games" role="radiogroup" aria-labelledby={`${id}-game`}>
              {games.map((g) => (
                <button
                  key={g.id}
                  role="radio"
                  aria-checked={g.id === gameId}
                  className={`sens-game${g.id === gameId ? " is-active" : ""}`}
                  onClick={() => {
                    setGameId(g.id);
                    setSens(g.example);
                  }}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
          <label className="sens-field">
            <span>
              2. Your {game.id === "fortnite" ? "X sensitivity" : "sensitivity"} in {game.name}
              {game.unit && ` (${game.unit})`}
            </span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={sens}
              onChange={(e) => setSens(e.target.value)}
            />
          </label>
          <label className="sens-field">
            <span>3. Your mouse DPI</span>
            <input type="number" inputMode="numeric" min="100" step="50" value={dpi} onChange={(e) => setDpi(e.target.value)} />
            <small>Usually 400, 800 or 1600. You&apos;ll find it in your mouse&apos;s software.</small>
          </label>
        </div>

        <div className="sens-readout" aria-live="polite">
          {result ? (
            <>
              <p className="sens-result-label">Try this in Valorant</p>
              <p className="sens-result">{result}</p>
              <p className="sens-result-note">
                Type it into Valorant&apos;s sensitivity setting and your aim should feel just like it did in{" "}
                {game.name}. Keep your mouse on the same DPI.
              </p>
              {edpi !== null && (
                <p className="sens-edpi">
                  At {dpiN} DPI that&apos;s <strong>{edpi} eDPI</strong>, the number players compare when they ask
                  &ldquo;what&apos;s your sens?&rdquo;
                </p>
              )}
            </>
          ) : (
            <p className="sens-result-note">Type your {game.name} sensitivity to get your Valorant number.</p>
          )}
          <div className="sens-next">
            <p>
              Then leave it alone. Changing it after every bad game stops your muscle memory from ever settling.{" "}
              The <strong>Mechanics</strong> lessons in the Climb Bundle help you train it.
            </p>
            <button className="text-button" onClick={() => openProduct("the-climb-bundle")}>
              See the Climb Bundle ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
