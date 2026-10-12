import { navLinks } from "../content/siteContent";

export default function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-ink text-white">
      <div className="mx-auto w-full max-w-[1320px] px-4 pt-14 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <p className="max-w-sm text-lg text-white/80">
            Know which card to use before you pay. Built for premium credit card users in India.
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-1">
            {[...navLinks, { label: "Privacy notice", href: "/privacy/" }].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="label inline-flex min-h-11 items-center text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-sm text-white/60">
          Card Co-Pilot is in development. &copy; 2026 aashlabs.in
        </p>
      </div>
      <p
        aria-hidden="true"
        className="display-font mt-6 select-none whitespace-nowrap text-center text-[17vw] font-bold leading-[0.8] tracking-[-0.05em] text-white/10"
      >
        Card Co-Pilot
      </p>
    </footer>
  );
}
