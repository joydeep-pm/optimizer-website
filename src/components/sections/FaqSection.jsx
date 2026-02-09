import SignalBadge from "../ui/SignalBadge";
import { faqCards } from "../../content/siteContent";

export default function FaqSection() {
  return (
    <section id="faq" className="mx-auto w-full max-w-[1240px] px-4 py-4 md:px-8 md:py-8">
      <div className="section-shell rounded-3xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">FAQ</p>
        <h2 className="display-font mt-4 text-3xl font-bold tracking-tight md:text-5xl">
          Compact answers for practical pre-join questions
        </h2>

        <div className="stagger-grid mt-7 grid gap-3 md:grid-cols-2">
          {faqCards.map((item, index) => (
            <details
              key={item.question}
              className="reveal-up hover-glow rounded-xl border border-white/12 bg-black/45 px-4 py-3 open:bg-black/60"
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{item.question}</p>
                  <SignalBadge label={item.tag} tone={index % 2 === 0 ? "info" : "amber"} />
                </div>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-white/72">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
