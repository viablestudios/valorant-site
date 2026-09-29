"use client";

import { useState } from "react";
import { useStoreUI } from "@/components/store/StoreUI";

const VIDEO_ID = "USiD0TLnjrE";
const START = 11; // seconds into the video
const TITLE = "Top 50 most viral Valorant clips of all time";

/**
 * Highlight-reel feature at the top of the review section. The YouTube player
 * only loads after the visitor presses play (thumbnail facade), so the page
 * stays fast and no YouTube cookies are set until then.
 */
export function FlickFeature() {
  const { openProduct } = useStoreUI();
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flick-feature">
      <div className="flick-copy">
        <p className="eyebrow">Watch, then train</p>
        <h2 id="flick-heading">
          50 plays that shouldn&apos;t have worked. <em>Here&apos;s why they did.</em>
        </h2>
        <p className="flick-lede">
          Impossible clutches, instant one taps and reads so good they look scripted. The final shot gets the replay,
          but the decisions before it won the round.
        </p>
        <p>Next time you watch, look past the flick:</p>
        <ul className="flick-study" aria-label="What to study in the video">
          <li>
            <strong>Where their crosshair already was</strong>
          </li>
          <li>
            <strong>When they chose to take the fight</strong>
          </li>
          <li>
            <strong>How they reset after the kill</strong>
          </li>
          <li>
            <strong>How calm they stay when the round goes wrong</strong>
          </li>
        </ul>
        <p>
          None of that is natural talent. It&apos;s habit, and habits can be trained, whether you&apos;re Iron or
          pushing for Immortal.
        </p>
        <div className="flick-ctas">
          <button className="gold-button" onClick={() => openProduct("the-climb-bundle")}>
            Start improving your game <span aria-hidden="true">↗</span>
          </button>
        </div>
        <p className="flick-tagline">Watch the clips. Learn the plays. Then make your own.</p>
      </div>

      <div className="flick-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&start=${START}&rel=0&modestbranding=1`}
            title={TITLE}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button className="flick-poster" onClick={() => setPlaying(true)} aria-label={`Play video: ${TITLE}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="" loading="lazy" />
            <span className="flick-reticle" aria-hidden="true">
              <svg viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="27" />
                <path d="M32 2v12M32 50v12M2 32h12M50 32h12" />
                <path className="flick-play" d="M27 22l16 10-16 10z" />
              </svg>
            </span>
            <span className="flick-caption">
              <span>{TITLE}</span>
              <span>YouTube</span>
            </span>
          </button>
        )}
        <span className="flick-corner tl" aria-hidden="true" />
        <span className="flick-corner tr" aria-hidden="true" />
        <span className="flick-corner bl" aria-hidden="true" />
        <span className="flick-corner br" aria-hidden="true" />
      </div>
    </div>
  );
}
