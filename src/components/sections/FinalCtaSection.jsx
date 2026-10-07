import WaitlistForm from "../WaitlistForm";
import { disclaimer } from "../../content/siteContent";

export default function FinalCtaSection() {
  return (
    <section id="waitlist" className="mx-auto w-full max-w-[1240px] px-4 py-10 md:px-8 md:py-16">
      <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#080b10] p-6 md:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/60">Early access</p>
          <h2 className="display-font mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            Stop guessing which card to use.
          </h2>
          <p className="mt-4 max-w-2xl text-white/60">
            Join the waitlist for product access and launch updates as Card Optimizer opens onboarding.
          </p>

          <div className="mt-7">
            <WaitlistForm variant="footer" buttonLabel="Join the waitlist" />
          </div>

          <p className="mt-6 text-xs text-white/38">{disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
