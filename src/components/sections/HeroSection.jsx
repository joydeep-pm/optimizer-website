import { useEffect, useRef, useState } from "react";
import WaitlistForm from "../WaitlistForm";
import { hero, navLinks, videoUrls } from "../../content/siteContent";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);

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
          className="absolute inset-0 h-full w-full origin-top-left scale-150 object-cover object-left-top"
          src={videoUrls[videoIndex]}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
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
          <a href="#top" className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[10px] font-bold text-black">
              CO
            </span>
            <span className="display-font text-sm font-semibold tracking-wide text-white">
              Card Optimizer
            </span>
          </a>

          <div className="hidden items-center gap-6 text-xs text-white/85 md:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:opacity-70">
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#top"
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:scale-105"
          >
            Join the Waitlist
          </a>
        </div>
      </nav>

      <div className="relative z-20 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 pb-44 pt-32 text-center md:px-6 md:pb-52">
        <span className="mb-6 rounded-full border border-white/25 bg-white/[0.08] px-4 py-1.5 text-[11px] font-medium text-white/92 backdrop-blur-md md:text-xs">
          {hero.eyebrow}
        </span>

        <h1 className="display-font max-w-5xl text-[clamp(2.5rem,8vw,6.2rem)] font-bold leading-[0.95] tracking-tight">
          {hero.headline}
        </h1>

        <p className="mt-6 max-w-3xl text-base text-white/82 md:text-xl">{hero.subheadline}</p>

        <div className="mt-8 flex w-full flex-col items-center gap-4">
          <WaitlistForm variant="hero" buttonLabel="Join the Waitlist" />
          <a
            href={hero.secondaryCtaHref}
            className="rounded-full border border-white/25 bg-black/45 px-7 py-2.5 text-sm font-semibold text-white transition hover:scale-105"
          >
            {hero.secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
