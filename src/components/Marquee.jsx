import { useRef } from "react";
import { useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { marqueeItems } from "../content/siteContent";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(useTransform(scrollY, (v) => v), { stiffness: 80, damping: 30 });
  const last = useRef(0);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !trackRef.current) return;
    const velocity = smoothVelocity.get() - last.current;
    last.current = smoothVelocity.get();
    const half = trackRef.current.scrollWidth / 2;
    const speed = 70 + Math.min(Math.abs(velocity) * 14, 900);
    let next = x.get() - (speed * delta) / 1000;
    if (next <= -half) next += half;
    x.set(next);
    trackRef.current.style.transform = `translate3d(${next}px,0,0)`;
  });

  return (
    <div className="overflow-hidden bg-ink py-5" aria-hidden="true">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="display-font flex items-center gap-8 pr-8 text-3xl font-bold text-white md:text-5xl">
            {item}
            <span className="text-violet">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
