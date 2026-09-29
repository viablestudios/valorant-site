import Image from "next/image";

/** Centre-stage artwork; the four headline words stay in readable side columns. */
export function CenteredHero() {
  return (
    <section className="centered-hero" aria-labelledby="hero-heading">
      <p className="hero-kicker eyebrow">
        Peakform / Built for your next level
      </p>
      <div className="centered-hero-art">
        <Image
          src="/images/characters/reyna-hero-cutout.webp"
          alt="Reyna surrounded by purple soul energy"
          width={941}
          height={1672}
          priority
          unoptimized
        />
      </div>
      <h1 id="hero-heading" className="centered-headline">
        <span>Play</span>
        <span>better.</span>
        <span>Rank</span>
        <span>higher.</span>
      </h1>
      <div className="centered-hero-bottom">
        <div className="hero-pitch">
          <h2>Less queueing. More cooking.</h2>
          <p>
            Guides, gear and setup upgrades for players who want to get
            <br />
            better without turning every loss into a TED Talk in team chat.
          </p>
          <p>
            Play smarter, look sharper, and maybe stop blaming the
            <br />
            matchmaking for five minutes.
          </p>
        </div>
        <div className="hero-action">
          <a href="#shop" className="gold-button">
            Find your next upgrade <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
