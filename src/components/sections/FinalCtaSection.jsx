import WaitlistForm from "../WaitlistForm";
import { disclaimer } from "../../content/siteContent";

export default function FinalCtaSection() {
  return (
    <section id="waitlist" className="mx-auto w-full max-w-[1240px] px-4 py-14 md:px-8 md:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#8c52ff] p-8 text-white md:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-white/20 blur-3xl"
        />
        <div className="relative">
          <p className="text-sm uppercase tracking-[0.2em] text-white/90">Early access</p>
          <h2 className="display-font mt-4 max-w-4xl text-balance text-4xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            Be first to know which card to swipe.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-white/95 md:text-xl">
            Join the waitlist for launch updates and onboarding instructions.
          </p>
          <div className="mt-8">
            <WaitlistForm variant="hero" buttonLabel="Join the Waitlist" tone="brand" />
          </div>
          <p className="mt-8 text-sm text-white/90">{disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
