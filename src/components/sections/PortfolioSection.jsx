import { portfolioCards } from "../../content/siteContent";

export default function PortfolioSection() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 py-4 md:px-8 md:py-8">
      <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">Card Portfolio</p>
        <h2 className="display-font mt-4 text-3xl font-bold tracking-tight md:text-5xl">
          Precision portfolio with 8 premium cards
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {portfolioCards.map((card) => (
            <article key={card.name} className="rounded-2xl border border-white/12 bg-black/45 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-white/55">{card.issuer}</p>
              <h3 className="display-font mt-2 text-lg font-bold">{card.name}</h3>
              <p className="mt-3 text-sm text-white/72">{card.signupBonus}</p>
              <div className="mt-4 border-t border-white/10 pt-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Annual fee</span>
                  <span className="font-semibold text-white/90">{card.annualFee}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-white/60">Best for</span>
                  <span className="text-right font-semibold text-white/90">{card.bestFor}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
