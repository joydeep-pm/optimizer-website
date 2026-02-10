import { motion } from "framer-motion";
import { disclaimer, securitySection } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

function signalLabel(signalType) {
  if (signalType === "trace") return "Trace";
  if (signalType === "policy") return "Policy";
  return "Signal";
}

function signalGlyph(signalType) {
  if (signalType === "trace") return "T";
  if (signalType === "policy") return "P";
  return "S";
}

function DividerLane({ title, body, signalType, delay = 0, withDivider = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className="relative text-left lg:pl-8"
    >
      {withDivider ? (
        <motion.span
          aria-hidden="true"
          className="absolute left-0 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-cyan-300/65 via-white/30 to-transparent lg:block"
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: delay + 0.05, ease: EASE }}
        />
      ) : null}

      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-semibold tracking-[0.08em] text-white/90">
          {signalGlyph(signalType)}
        </span>
        <span className="text-xs uppercase tracking-[0.14em] text-white/58">{signalLabel(signalType)}</span>
      </div>

      <h3 className="display-font text-left text-3xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 max-w-md text-left text-base leading-relaxed text-white/72">{body}</p>
    </motion.article>
  );
}

export default function SecuritySection() {
  const firstPanel = {
    title: "Trust by Design",
    body: securitySection.bullets.join(" "),
    signalType: "shield",
  };

  return (
    <section id="security" className="mx-auto w-full max-w-[1240px] px-4 py-14 md:px-8 md:py-20">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="text-left"
      >
        <p className="text-left text-xs uppercase tracking-[0.2em] text-white/55">
          {securitySection.eyebrow}
        </p>
        <h2 className="display-font mt-3 max-w-4xl text-left text-4xl font-bold tracking-tight text-white md:text-6xl">
          {securitySection.title}
        </h2>
        <p className="mt-4 max-w-3xl text-left text-base leading-relaxed text-white/72">
          {securitySection.body}
        </p>
      </motion.header>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <DividerLane
            title={firstPanel.title}
            body={firstPanel.body}
            signalType={firstPanel.signalType}
            delay={0}
          />
        </div>

        {securitySection.panels.map((item, index) => (
          <div key={item.title} className="lg:col-span-4">
            <DividerLane
              title={item.title}
              body={item.point}
              signalType={item.signalType}
              delay={0.05 * (index + 1)}
              withDivider
            />
          </div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
        className="mt-10 border-t border-white/12 pt-4 text-left text-sm text-white/62"
      >
        {disclaimer}
      </motion.p>
    </section>
  );
}
