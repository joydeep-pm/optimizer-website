import { navLinks } from "../content/siteContent";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-bone/95">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-4 md:px-8">
        <a href="#top" className="flex min-h-11 items-center gap-2.5">
          <span className="display-font inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
            CP
          </span>
          <span className="display-font text-lg font-bold tracking-tight">Card Co-Pilot</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="label inline-flex min-h-11 items-center text-ink/70 transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#waitlist"
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Join the waitlist
        </a>
      </div>
    </header>
  );
}
