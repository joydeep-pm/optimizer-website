import { navLinks } from "../../content/siteContent";

export default function FooterSection() {
  return (
    <footer className="mx-auto w-full max-w-[1240px] px-4 pb-10 pt-6 md:px-8">
      <div className="flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="#top" className="display-font text-lg font-semibold text-white">
            Card Optimizer
          </a>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/42">
            Independent recommendation guidance for credit card reward decisions. Not affiliated with or endorsed by card issuers unless explicitly stated.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/50">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-white">
              {item.label}
            </a>
          ))}
          <a href="mailto:hello@cardoptimizer.in" className="hover:text-white">Contact</a>
        </nav>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-white/30">
        Reward programs, eligibility rules, caps and terms can change. Verify material decisions against current issuer terms.
      </p>
    </footer>
  );
}
