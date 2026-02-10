import { motion } from "framer-motion";
import SignalBadge from "../ui/SignalBadge";
import { featureRows, featuresSection } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

const iconMap = {
  merchant: "M",
  channel: "C",
  yield: "Y",
  vault: "V",
  clarity: "R",
  explain: "E",
};

/* ── Mini-visualizations unique to each feature ────────────────────── */

function MerchantViz() {
  return (
    <div className="mt-5 rounded-xl border border-violet-400/8 bg-black/40 p-4">
      <div className="flex items-center gap-2">
        {["Merchant", "Rules", "Card"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span className="rounded-md border border-violet-400/14 bg-violet-500/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-violet-200/80">
              {label}
            </span>
            {i < 2 ? (
              <div className="h-px w-6 bg-gradient-to-r from-violet-400/40 to-violet-400/10" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-1.5">
        <div className="h-1.5 rounded-full bg-gradient-to-r from-violet-400/55 via-violet-300/18 to-transparent" />
        <div className="h-1.5 w-3/4 rounded-full bg-gradient-to-r from-indigo-400/40 via-indigo-300/12 to-transparent" />
        <div className="h-1.5 w-1/2 rounded-full bg-gradient-to-r from-purple-400/30 via-purple-300/8 to-transparent" />
      </div>
    </div>
  );
}

function ChannelViz() {
  const layers = [
    { label: "Online", w: "100%" },
    { label: "Offline", w: "76%" },
    { label: "UPI", w: "58%" },
    { label: "Portal", w: "40%" },
  ];
  return (
    <div className="mt-4 space-y-2">
      {layers.map((ch) => (
        <div key={ch.label} className="flex items-center gap-3">
          <span className="w-14 shrink-0 text-[10px] uppercase tracking-wider text-white/38">
            {ch.label}
          </span>
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-indigo-400/50 to-transparent"
            style={{ width: ch.w }}
          />
        </div>
      ))}
    </div>
  );
}

function YieldViz() {
  const bars = [68, 44, 82, 56, 72];
  return (
    <div className="mt-4 flex items-end gap-1.5">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-full rounded-t bg-gradient-to-t from-violet-400/50 to-violet-300/10"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

/* ── Feature card — accent bar + violet tones ──────────────────────── */

function FeatureCard({ feature, index, className = "", children }) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.045] to-white/[0.01] p-6 ${className}`}
    >
      {/* Left accent */}
      <div className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full bg-gradient-to-b from-violet-400/50 via-indigo-400/25 to-transparent" />

      <div className="relative pl-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/12 text-xs font-bold text-violet-300/90">
            {iconMap[feature.iconKey] || "•"}
          </div>
          <SignalBadge label={feature.statusTag} tone={feature.badgeTone} />
        </div>
        <h3 className="display-font mt-3 text-left text-xl font-semibold tracking-tight text-white">
          {feature.title}
        </h3>
        <p className="mt-2 text-left text-sm leading-relaxed text-white/58">
          {feature.microCopy}
        </p>
        {children}
      </div>
    </motion.article>
  );
}

/* ── Section ───────────────────────────────────────────────────────── */

const visualLead = featureRows.row1[0];
const sideLead = featureRows.row1[1];
const [tileA, tileB, tileC] = featureRows.row2;

export default function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden bg-[#020202] py-24 md:py-32">
      {/* Ambient glow — violet / indigo (distinct from ValueSection's cyan) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 60% 50% at 72% 28%, rgba(139,92,246,0.13), transparent)",
            "radial-gradient(ellipse 55% 55% at 18% 75%, rgba(99,102,241,0.09), transparent)",
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(168,85,247,0.07), transparent)",
          ].join(", "),
        }}
      />
      {/* Dot-grid texture — unique to this section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,92,246,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-[1] mx-auto max-w-[1240px] px-4 md:px-8">
        {/* Header — violet eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300/70">
            {featuresSection.eyebrow}
          </p>
          <h2 className="display-font mt-4 max-w-4xl text-left text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
            {featuresSection.title}
          </h2>
          <p className="mt-5 max-w-3xl text-left text-lg leading-relaxed text-white/58 md:text-xl">
            {featuresSection.body}
          </p>
        </motion.div>

        {/* Main grid — three equal columns */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard feature={visualLead} index={0}>
            <MerchantViz />
          </FeatureCard>
          <FeatureCard feature={sideLead} index={1}>
            <ChannelViz />
          </FeatureCard>
          <FeatureCard feature={tileA} index={2}>
            <YieldViz />
          </FeatureCard>
        </div>

        {/* Bottom row */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <FeatureCard feature={tileB} index={3} />
          <FeatureCard feature={tileC} index={4} />

          {/* Operating Principle — distinct violet panel */}
          <motion.article
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            className="relative overflow-hidden rounded-2xl border border-violet-400/10 bg-violet-500/[0.04] p-6 text-left"
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-violet-300/55">
              Operating Principle
            </p>
            <h3 className="display-font mt-2 text-xl font-semibold tracking-tight text-white">
              {featureRows.row3.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/58">
              {featureRows.row3.microCopy}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <SignalBadge label={featureRows.row3.statusTag} tone={featureRows.row3.badgeTone} />
              <SignalBadge label={featureRows.row3.signalState} tone={featureRows.row3.signalTone} />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
