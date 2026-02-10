import { motion } from "framer-motion";
import BaselineContainer from "../ui/BaselineContainer";
import FadeIn from "../ui/FadeIn";
import GlowIconTile from "../ui/GlowIconTile";
import SectionIntro from "../ui/SectionIntro";
import SignalBadge from "../ui/SignalBadge";
import SpotlightCard from "../ui/SpotlightCard";
import { featureRows, featuresSection } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

function FeatureMeta({ iconKey, tone, signalState, signalTone }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <GlowIconTile iconKey={iconKey} tone={tone} />
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-[0.14em] text-white/56">signal</span>
        <SignalBadge label={signalState} tone={signalTone} />
      </div>
    </div>
  );
}

const visualLead = featureRows.row1[0];
const sideLead = featureRows.row1[1];
const [tileA, tileB, tileC] = featureRows.row2;

export default function FeaturesSection() {
  return (
    <BaselineContainer id="features" tone="neutral">
      <SectionIntro
        eyebrow={featuresSection.eyebrow}
        title={featuresSection.title}
        body={featuresSection.body}
        titleClassName="max-w-4xl text-left"
        bodyClassName="max-w-3xl text-left"
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        <FadeIn className="lg:col-span-3" delay={0}>
          <SpotlightCard
            title={visualLead.title}
            body={visualLead.microCopy}
            badge={visualLead.statusTag}
            badgeTone={visualLead.badgeTone}
            className="min-h-[360px]"
            spotlightSize={460}
            ambientStrength={0.22}
          >
            <div className="space-y-4">
              <FeatureMeta
                iconKey={visualLead.iconKey}
                tone={visualLead.tone}
                signalState={visualLead.signalState}
                signalTone={visualLead.signalTone}
              />
              <div className="rounded-xl border border-white/14 bg-black/35 p-4">
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300/70 to-transparent" />
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-200/60 to-transparent" />
                  <div className="h-2 rounded-full bg-gradient-to-r from-blue-300/50 to-transparent" />
                </div>
              </div>
            </div>
          </SpotlightCard>
        </FadeIn>

        <div className="grid gap-4 lg:col-span-2">
          <FadeIn delay={0.05}>
            <SpotlightCard
              title={sideLead.title}
              body={sideLead.microCopy}
              badge={sideLead.statusTag}
              badgeTone={sideLead.badgeTone}
              className="min-h-[172px]"
              spotlightSize={320}
              ambientStrength={0.18}
            >
              <FeatureMeta
                iconKey={sideLead.iconKey}
                tone={sideLead.tone}
                signalState={sideLead.signalState}
                signalTone={sideLead.signalTone}
              />
            </SpotlightCard>
          </FadeIn>

          <FadeIn delay={0.1}>
            <SpotlightCard
              title={tileA.title}
              body={tileA.microCopy}
              badge={tileA.statusTag}
              badgeTone={tileA.badgeTone}
              className="min-h-[172px]"
              spotlightSize={280}
              ambientStrength={0.15}
            >
              <FeatureMeta
                iconKey={tileA.iconKey}
                tone={tileA.tone}
                signalState={tileA.signalState}
                signalTone={tileA.signalTone}
              />
            </SpotlightCard>
          </FadeIn>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {[tileB, tileC].map((feature, index) => (
          <FadeIn key={feature.title} delay={0.15 + index * 0.05}>
            <SpotlightCard
              title={feature.title}
              body={feature.microCopy}
              badge={feature.statusTag}
              badgeTone={feature.badgeTone}
              className="min-h-[168px]"
              spotlightSize={260}
              ambientStrength={0.14}
            >
              <FeatureMeta
                iconKey={feature.iconKey}
                tone={feature.tone}
                signalState={feature.signalState}
                signalTone={feature.signalTone}
              />
            </SpotlightCard>
          </FadeIn>
        ))}

        <FadeIn delay={0.25}>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.25 }}
            className="rounded-2xl border border-white/12 bg-black/40 p-6 text-left"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-white/54">Operating Principle</p>
            <h3 className="display-font mt-2 text-left text-2xl font-semibold tracking-tight text-white">
              {featureRows.row3.title}
            </h3>
            <p className="mt-2 text-left text-base leading-relaxed text-white/72">
              {featureRows.row3.microCopy}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <SignalBadge label={featureRows.row3.statusTag} tone={featureRows.row3.badgeTone} />
              <SignalBadge label={featureRows.row3.signalState} tone={featureRows.row3.signalTone} />
            </div>
          </motion.article>
        </FadeIn>
      </div>
    </BaselineContainer>
  );
}
