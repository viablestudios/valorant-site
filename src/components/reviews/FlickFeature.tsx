"use client";

import { useState } from "react";
import { useStoreUI } from "@/components/store/StoreUI";

const VIDEO_ID = "CvlTxVjutuI";

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
          Stop watching better players. <em>Start becoming one.</em>
        </h2>
        <p className="flick-lede">
          10 Minutes of CRAZY Valorant Flicks isn&apos;t just a highlight reel. It&apos;s a look at the speed,
          confidence and precision you can build when your aim, movement and decision-making start working together.
        </p>
        <p>
          If you&apos;re tired of losing gunfights you know you should be winning, this is the level to work towards.
        </p>
        <ul className="flick-study" aria-label="What to study in the video">
          <li>
            <strong>Watch the flicks</strong>
          </li>
          <li>
            <strong>Study the crosshair placement</strong>
          </li>
          <li>
            <strong>Pay attention to the reactions</strong>
          </li>
        </ul>
        <p>
          You don&apos;t need &ldquo;insane natural aim.&rdquo; You need the right practice. Our training helps you
          sharpen your mechanics, improve your consistency and stop relying on random good games.
        </p>
        <div className="flick-ctas">
          <button className="gold-button" onClick={() => openProduct("the-climb-bundle")}>
            Start improving your aim <span aria-hidden="true">↗</span>
          </button>
        </div>
        <p className="flick-tagline">Train smarter. Win more fights. Climb higher.</p>
      </div>

      <div className="flick-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
            title="10 Minutes of CRAZY Valorant Flicks"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button className="flick-poster" onClick={() => setPlaying(true)} aria-label="Play video: 10 Minutes of CRAZY Valorant Flicks">
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
              <span>10 Minutes of CRAZY Valorant Flicks</span>
              <span>YouTube · 10 min</span>
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
