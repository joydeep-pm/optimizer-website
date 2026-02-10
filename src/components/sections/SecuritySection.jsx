import BaselineContainer from "../ui/BaselineContainer";
import FadeIn from "../ui/FadeIn";
import GlowIconTile from "../ui/GlowIconTile";
import InfoCard from "../ui/InfoCard";
import SectionIntro from "../ui/SectionIntro";
import SignalBadge from "../ui/SignalBadge";
import { disclaimer, securitySection } from "../../content/siteContent";

export default function SecuritySection() {
  return (
    <BaselineContainer id="security" tone="plum">
      <div className="grid gap-7 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionIntro
            eyebrow={securitySection.eyebrow}
            title={securitySection.title}
            body={securitySection.body}
            titleClassName="max-w-xl"
          />

          <ul className="mt-6 space-y-2">
            {securitySection.bullets.map((bullet, index) => (
              <FadeIn key={bullet} delay={index * 0.08} direction="up" distance={8}>
                <li className="rounded-lg border border-white/12 bg-black/35 px-3 py-2 text-sm text-white/76">
                  {bullet}
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4">
            {securitySection.panels.map((item, index) => (
              <InfoCard
                key={item.title}
                title={item.title}
                body={item.point}
                badge={item.tag}
                badgeTone={index === 0 ? "info" : "amber"}
                variant="trust"
                className="min-h-[170px]"
                visual={
                  <div className="flex items-center justify-between gap-3">
                    <GlowIconTile iconKey={item.signalType} tone={index === 0 ? "blue" : "amber"} />
                    <SignalBadge label="Trust signal" tone={index === 0 ? "info" : "default"} />
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 rounded-full border border-white/14 bg-black/30 px-3 py-2">
        <span className="rounded-full border border-white/20 bg-white/[0.05] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-white/72">
          Legal note
        </span>
        <p className="text-sm text-white/64">{disclaimer}</p>
      </div>
    </BaselineContainer>
  );
}
