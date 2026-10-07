import { motion } from "framer-motion";
import { disclaimer, securitySection } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

export default function SecuritySection() {
  return (
    <section id="security" className="mx-auto w-full max-w-[1240px] px-4 py-20 md:px-8 md:py-24">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-white/48">{securitySection.eyebrow}</p>
        <h2 className="display-font mt-3 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          {securitySection.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/62">{securitySection.body}</p>
      </motion.header>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {securitySection.panels.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
            className="rounded-2xl border border-white/9 bg-white/[0.02] p-6"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/14 text-xs font-semibold text-white/70">
              0{index + 1}
            </span>
            <h3 className="display-font mt-6 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/56">{item.point}</p>
          </motion.article>
        ))}
      </div>

      <p className="mt-8 border-t border-white/10 pt-4 text-sm text-white/45">{disclaimer}</p>
    </section>
  );
}
