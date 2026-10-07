import { motion } from "framer-motion";
import { valueSection } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

const comparison = [
  { name: "Card A", rate: "1.5x", width: "30%" },
  { name: "Card B", rate: "3x", width: "58%" },
  { name: "Card C", rate: "5x", width: "92%", best: true },
];

export default function ValueSection() {
  return (
    <section id="product" className="relative overflow-hidden bg-[#020202] py-20 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">
            {valueSection.eyebrow}
          </p>
          <h2 className="display-font mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
            {valueSection.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/62">
            {valueSection.body}
          </p>

          <div className="mt-8 space-y-5 border-t border-white/10 pt-6">
            {valueSection.supportItems.map((item, index) => (
              <div key={item.title} className="grid grid-cols-[28px_1fr] gap-3">
                <span className="display-font pt-0.5 text-sm text-cyan-200/70">0{index + 1}</span>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/52">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          className="overflow-hidden rounded-[28px] border border-white/12 bg-[#080b10] shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 md:px-7">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Recommendation preview</p>
              <p className="mt-1 text-sm font-medium text-white/80">Illustrative example</p>
            </div>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-200/80">
              Ready to compare
            </span>
          </div>

          <div className="grid gap-5 p-5 md:grid-cols-3 md:p-7">
            {[
              ["Merchant", "Amazon"],
              ["Spend", "₹18,000"],
              ["Channel", "Online"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/8 bg-white/[0.025] p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/38">{label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/8 px-5 py-6 md:px-7">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/38">Portfolio comparison</p>
            <div className="mt-5 space-y-4">
              {comparison.map((card) => (
                <div key={card.name} className={card.best ? "rounded-xl border border-cyan-300/20 bg-cyan-300/[0.045] p-3" : "p-3"}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-white/82">{card.name}</span>
                    <span className={card.best ? "text-sm font-semibold text-cyan-200" : "text-sm text-white/52"}>
                      {card.rate}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className={card.best ? "h-full rounded-full bg-cyan-300" : "h-full rounded-full bg-white/28"}
                      initial={{ width: 0 }}
                      whileInView={{ width: card.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-300/16 bg-cyan-300/[0.055] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-100/55">Best route</p>
                  <p className="mt-1 display-font text-xl font-semibold text-white">Card C · issuer portal</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black">5x example</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/58">
                One recommendation, with the card, payment route and reason it ranks above the alternatives.
              </p>
            </div>
          </div>

          <p className="border-t border-white/8 px-5 py-3 text-xs text-white/35 md:px-7">
            Illustrative only. Actual outcomes depend on issuer terms, exclusions, caps and eligibility.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
