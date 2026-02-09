import { disclaimer, intelligenceExamples } from "../../content/siteContent";

export default function IntelligenceSection() {
  return (
    <section id="intelligence" className="mx-auto w-full max-w-[1240px] px-4 py-4 md:px-8 md:py-8">
      <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">Yield Intelligence</p>
        <h2 className="display-font mt-4 text-3xl font-bold tracking-tight md:text-5xl">
          Merchant-rule examples grounded in product logic
        </h2>

        <p className="mt-4 max-w-3xl text-white/75">
          These sample scenarios illustrate how route-aware card selection can change effective
          reward direction for specific spend contexts.
        </p>

        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          {intelligenceExamples.map((item) => (
            <article key={`${item.merchant}-${item.card}`} className="rounded-2xl border border-white/12 bg-black/45 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/65">
                  {item.merchant}
                </p>
                <p className="display-font text-2xl font-bold text-white">{item.sampleYield}</p>
              </div>
              <p className="mt-2 text-sm font-semibold text-white/90">{item.card}</p>
              <p className="mt-2 text-sm text-white/72">{item.note}</p>
            </article>
          ))}
        </div>

        <p className="mt-6 rounded-xl border border-white/14 bg-black/45 px-4 py-3 text-sm text-white/70">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
