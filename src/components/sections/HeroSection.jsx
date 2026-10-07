import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import WaitlistForm from "../WaitlistForm";
import { hero, navLinks, videoUrls } from "../../content/siteContent";

export default function HeroSection() {
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {});
  }, [videoIndex, reduceMotion]);

  function handleVideoError() {
    if (videoIndex < videoUrls.length - 1) {
      setVideoIndex((prev) => prev + 1);
      return;
    }
    setVideoFailed(true);
  }

  const showVideo = !reduceMotion && !videoFailed;

  return (
    <section id="top" className="relative min-h-screen overflow-hidden rounded-b-[30px] bg-black text-white">
      {showVideo ? (
        <video
          key={videoUrls[videoIndex]}
          ref={videoRef}
          className="absolute inset-0 h-full w-full origin-top-left scale-150 object-cover object-left-top"
          src={videoUrls[videoIndex]}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={handleVideoError}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_74%,rgba(255,75,140,0.38),transparent_34%),radial-gradient(circle_at_68%_88%,rgba(67,156,255,0.32),transparent_26%),linear-gradient(180deg,#090909_0%,#000_100%)]" />
      )}

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-[#020202]" />

      <nav aria-label="Primary" className="absolute top-0 z-30 w-full px-4 py-4 md:px-8">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between rounded-full border border-white/10 bg-black/45 px-4 py-2.5 backdrop-blur-xl">
          <a href="#top" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[10px] font-bold text-black">
              CO
            </span>
            <span className="display-font text-sm font-semibold tracking-wide text-white">
              Card Optimizer
            </span>
          </a>

          <div className="hidden items-center gap-6 text-xs text-white/80 md:flex">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#waitlist"
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
          >
            Join waitlist
          </a>
        </div>
      </nav>

      <div className="relative z-20 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 pb-24 pt-32 text-center md:px-6 md:pb-32">
        <span className="mb-6 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-md md:text-xs">
          {hero.eyebrow}
        </span>

        <h1 className="display-font max-w-5xl text-[clamp(2.7rem,7.6vw,6.1rem)] font-bold leading-[0.96] tracking-tight">
          {hero.headline}
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/76 md:text-xl">
          {hero.subheadline}
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-4">
          <WaitlistForm variant="hero" buttonLabel="Join the waitlist" />
          <a
            href={hero.secondaryCtaHref}
            className="rounded-full border border-white/20 bg-black/40 px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
          >
            {hero.secondaryCtaLabel}
          </a>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/52">
          <span>Merchant-aware</span>
          <span>Online · Offline · UPI · Portal</span>
          <span>Explainable recommendations</span>
        </div>
      </div>
    </section>
  );
}
