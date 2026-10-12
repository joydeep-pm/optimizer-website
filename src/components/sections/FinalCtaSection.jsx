import WaitlistForm from "../WaitlistForm";
import { disclaimer } from "../../content/siteContent";

export default function FinalCtaSection() {
  return (
    <section id="waitlist" className="mx-auto w-full max-w-[1320px] px-4 pb-16 md:px-8 md:pb-28">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-violet p-8 text-white md:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-white/20 blur-3xl"
        />
        <div className="relative">
          <p className="label text-white/90">[06] Early access</p>
          <h2 className="display-font mt-5 max-w-5xl text-balance text-5xl font-bold leading-[0.95] tracking-[-0.03em] md:text-8xl">
            Be first to know which card to swipe.
          </h2>
          <p className="mt-6 max-w-2xl text-xl text-white/95">
            Join the waitlist for launch updates and onboarding instructions.
          </p>
          <div className="mt-10">
            <WaitlistForm variant="hero" buttonLabel="Join the Waitlist" tone="brand" />
          </div>
          <p className="mt-8 text-sm text-white/90">{disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
