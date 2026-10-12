import { navLinks } from "../content/siteContent";

export default function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[1320px] items-center justify-between rounded-full border border-ink/10 bg-bone/95 px-4 shadow-[0_6px_30px_rgba(0,0,0,0.12)] md:px-6">
        <a href="#top" className="flex min-h-11 items-center gap-2.5">
          <span className="display-font inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
            CP
          </span>
          <span className="display-font hidden whitespace-nowrap text-lg font-bold tracking-tight text-ink min-[420px]:inline">Card Co-Pilot</span>
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
          className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Join the waitlist
        </a>
      </div>
    </header>
  );
}
