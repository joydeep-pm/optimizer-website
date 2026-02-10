import { type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import SignalBadge from "./SignalBadge";

type BadgeTone = "default" | "positive" | "info" | "amber";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

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
  ambientStrength = 0.2,
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

  const boundedAmbient = Math.min(Math.max(ambientStrength, 0.05), 0.4);

  const spotlightBg = useMotionTemplate`
    radial-gradient(
      ${spotlightSize}px circle at ${mouseX}px ${mouseY}px,
      rgba(56, 189, 248, ${boundedAmbient}),
      rgba(14, 165, 233, ${boundedAmbient * 0.45}) 38%,
      transparent 72%
    )
  `;

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-black/45 p-6 backdrop-blur-xl ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(circle at 18% 18%, rgba(56,189,248,0.14), transparent 42%), radial-gradient(circle at 88% 82%, rgba(236,72,153,0.08), transparent 44%)",
        }}
      />

      {!reduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: spotlightBg }}
          transition={{ duration: 0.2, ease: EASE }}
        />
      ) : null}

      <div className="relative z-[1] flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display-font text-left text-2xl font-semibold leading-tight tracking-tight text-white">
            {title}
          </h3>
          {badge ? <SignalBadge label={badge} tone={badgeTone} /> : null}
        </div>

        <p className="mt-2 text-left text-base leading-relaxed text-white/72">{body}</p>

        {children ? <div className={alignFooter ? "mt-auto pt-5" : "mt-4"}>{children}</div> : null}
      </div>
    </motion.article>
  );
}
