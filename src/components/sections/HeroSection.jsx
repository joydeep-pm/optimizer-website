import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import WaitlistForm from "../WaitlistForm";
import { hero, heroPoster, navLinks, videoUrls } from "../../content/siteContent";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {});
  }, [videoIndex]);

  function handleVideoError() {
    if (videoIndex < videoUrls.length - 1) {
      setVideoIndex((prev) => prev + 1);
      return;
    }
    setVideoFailed(true);
  }

  function handleLoadedData() {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {});
  }

  return (
    <section id="top" className="relative min-h-screen overflow-hidden rounded-b-[30px] bg-black text-white">
      {!videoFailed ? (
        <video
          key={videoUrls[videoIndex]}
          ref={videoRef}
          poster={heroPoster}
          className="absolute inset-0 h-full w-full scale-110 object-cover object-[78%_62%] md:origin-top-left md:scale-150 md:object-left-top"
          src={videoUrls[videoIndex]}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={handleVideoError}
          onLoadedData={handleLoadedData}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_74%,rgba(255,75,140,0.52),transparent_36%),radial-gradient(circle_at_68%_88%,rgba(67,156,255,0.42),transparent_25%),linear-gradient(180deg,#090909_0%,#000_100%)]" />
      )}

      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />

      <nav className="absolute top-0 z-30 w-full px-4 py-4 md:px-8">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between rounded-full border border-white/10 bg-black/35 px-4 py-2.5 backdrop-blur-xl">
          <a href="#top" className="flex min-h-11 items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-black">
              CO
            </span>
            <span className="display-font text-sm font-semibold tracking-wide text-white">
              Card Optimizer
            </span>
          </a>

          <div className="hidden items-center gap-6 text-sm text-white/85 md:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="inline-flex min-h-11 items-center rounded px-1 transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#top"
            className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Join the Waitlist
          </a>
        </div>
      </nav>

      <div className="relative z-20 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 pb-44 pt-32 text-center md:px-6 md:pb-52">
        <span className="mb-6 rounded-full border border-white/25 bg-white/[0.08] px-4 py-1.5 text-xs font-medium text-white/92 backdrop-blur-md md:text-sm">
          {hero.eyebrow}
        </span>

        <h1
          aria-label={hero.headline}
          className="display-font max-w-5xl text-balance text-[clamp(2.75rem,9vw,7.25rem)] font-bold leading-[0.95] tracking-tight"
        >
          {hero.headline.split(" ").map((word, index) => (
            <span
              key={`${word}-${index}`}
              aria-hidden="true"
              className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-top last:mr-0"
            >
              <motion.span
                className={`inline-block ${index >= 5 ? "text-[#c4b0ff]" : ""}`}
                initial={reduceMotion ? false : { y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <p className="mt-7 max-w-2xl text-balance text-lg text-white/85 md:text-2xl">{hero.subheadline}</p>

        <div className="mt-8 flex w-full flex-col items-center gap-4">
          <WaitlistForm variant="hero" buttonLabel="Join the Waitlist" />
          <a
            href={hero.secondaryCtaHref}
            className="inline-flex min-h-11 items-center rounded-full border border-white/25 bg-black/45 px-7 text-sm font-semibold text-white transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {hero.secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
