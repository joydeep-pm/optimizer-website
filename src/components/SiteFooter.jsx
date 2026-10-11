import { disclaimer, navLinks } from "../content/siteContent";

export default function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1240px] border-t border-white/14 px-4 py-10 md:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <a href="#top" className="inline-flex min-h-11 items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
              CO
            </span>
            <span className="display-font text-base font-semibold text-white">Card Optimizer</span>
          </a>
          <p className="mt-2 max-w-sm text-sm text-white/65">
            Know which card to use before you pay. Built for premium card holders in India.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/80">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="inline-flex min-h-11 items-center hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mt-8 text-xs text-white/60">{disclaimer}</p>
      <p className="mt-2 text-xs text-white/50">&copy; 2026 Card Optimizer. aashlabs.in</p>
    </footer>
  );
}
