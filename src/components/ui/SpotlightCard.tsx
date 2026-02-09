import { type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import SignalBadge from "./SignalBadge";

type BadgeTone = "default" | "positive" | "info" | "amber";

interface SpotlightCardProps {
  title: string;
  body: string;
  badge?: string;
  badgeTone?: BadgeTone;
  className?: string;
  children?: ReactNode;
}

export default function SpotlightCard({
  title,
  body,
  badge,
  badgeTone = "default",
  className = "",
  children,
}: SpotlightCardProps) {
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(-999);
    mouseY.set(-999);
  }

  const spotlightBg = useMotionTemplate`
    radial-gradient(
      320px circle at ${mouseX}px ${mouseY}px,
      rgba(56, 189, 248, 0.26),
      rgba(129, 140, 248, 0.14) 35%,
      transparent 70%
    )
  `;

  const spotlightBorder = useMotionTemplate`
    radial-gradient(
      280px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.62),
      transparent 65%
    )
  `;

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5, scale: 1.014 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-2xl border border-white/12 bg-black/45 p-4 backdrop-blur-xl ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{ opacity: [0.24, 0.42, 0.24] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(56,189,248,0.18), transparent 40%), radial-gradient(circle at 90% 90%, rgba(236,72,153,0.12), transparent 44%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: spotlightBg }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-70"
        style={{
          background: spotlightBorder,
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(255,255,255,0.06) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.05) 100%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent"
        animate={{ x: ["0%", "360%"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-[1]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display-font text-xl font-bold tracking-tight text-white">{title}</h3>
          {badge ? <SignalBadge label={badge} tone={badgeTone} /> : null}
        </div>

        <p className="mt-2 text-sm leading-relaxed text-white/72">{body}</p>

        {children ? <div className="mt-3">{children}</div> : null}
      </div>
    </motion.article>
  );
}
