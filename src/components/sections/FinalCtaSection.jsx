import WaitlistForm from "../WaitlistForm";
import { disclaimer } from "../../content/siteContent";

export default function FinalCtaSection() {
  return (
    <section id="waitlist" className="mx-auto w-full max-w-[1240px] px-4 py-8 md:px-8 md:py-14">
      <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">Final CTA</p>
        <h2 className="display-font mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
          Join the waitlist for early access to Card Optimizer
        </h2>
        <p className="mt-4 max-w-2xl text-white/74">
          Be first to access recommendation updates, onboarding windows, and upcoming intelligence
          releases.
        </p>

        <div className="mt-6">
          <WaitlistForm variant="footer" buttonLabel="Join the Waitlist" />
        </div>

        <p className="mt-6 text-sm text-white/65">{disclaimer}</p>
      </div>
    </section>
  );
}
