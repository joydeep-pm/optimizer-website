import { type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import SignalBadge from "./SignalBadge";

type BadgeTone = "default" | "positive" | "info" | "amber";

interface SpotlightCardProps {
  title: string;
  body: string;
  badge?: string;
  badgeTone?: BadgeTone;
  className?: string;
  children?: ReactNode;
  spotlightSize?: number;
  ambientStrength?: number;
  alignFooter?: boolean;
}

export default function SpotlightCard({
  title,
  body,
  badge,
  badgeTone = "default",
  className = "",
  children,
  spotlightSize = 320,
  ambientStrength = 0.24,
  alignFooter = true,
}: SpotlightCardProps) {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(-999);
    mouseY.set(-999);
  }

  const boundedAmbient = Math.min(Math.max(ambientStrength, 0.05), 0.5);

  const spotlightBg = useMotionTemplate`
    radial-gradient(
      ${spotlightSize}px circle at ${mouseX}px ${mouseY}px,
      rgba(56, 189, 248, ${boundedAmbient}),
      rgba(129, 140, 248, ${boundedAmbient * 0.52}) 35%,
      transparent 70%
    )
  `;

  const spotlightBorder = useMotionTemplate`
    radial-gradient(
      ${Math.max(spotlightSize - 40, 180)}px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.62),
      transparent 66%
    )
  `;

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.012 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-black/45 p-4 backdrop-blur-xl ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.18, 0.34, 0.18],
              }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(56,189,248,0.16), transparent 40%), radial-gradient(circle at 90% 90%, rgba(236,72,153,0.11), transparent 44%)",
        }}
      />

      {!reduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: spotlightBg }}
        />
      ) : null}

      {!reduceMotion ? (
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
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-28"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(255,255,255,0.05) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.05) 100%)",
        }}
      />

      {!reduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
          animate={{ x: ["0%", "360%"] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
        />
      ) : null}

      <div className="relative z-[1] flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display-font min-h-[56px] text-xl font-bold leading-tight tracking-tight text-white">
            {title}
          </h3>
          {badge ? <SignalBadge label={badge} tone={badgeTone} /> : null}
        </div>

        <p className="mt-2 min-h-[52px] text-sm leading-relaxed text-white/72">{body}</p>

        {children ? <div className={alignFooter ? "mt-auto pt-5" : "mt-4"}>{children}</div> : null}
      </div>
    </motion.article>
  );
}
