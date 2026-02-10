import BaselineContainer from "../ui/BaselineContainer";
import GlowIconTile from "../ui/GlowIconTile";
import SectionIntro from "../ui/SectionIntro";
import SignalBadge from "../ui/SignalBadge";
import SpotlightCard from "../ui/SpotlightCard";
import { featureRows, featuresSection } from "../../content/siteContent";

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

export default function FeaturesSection() {
  return (
    <BaselineContainer id="features" tone="neutral">
      <SectionIntro
        eyebrow={featuresSection.eyebrow}
        title={featuresSection.title}
        body={featuresSection.body}
        titleClassName="max-w-4xl"
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {featureRows.row1.map((feature) => (
          <SpotlightCard
            key={feature.title}
            title={feature.title}
            body={feature.microCopy}
            badge={feature.statusTag}
            badgeTone={feature.badgeTone}
            className="min-h-[250px]"
            spotlightSize={360}
            ambientStrength={0.28}
          >
            <FeatureMeta
              iconKey={feature.iconKey}
              tone={feature.tone}
              signalState={feature.signalState}
              signalTone={feature.signalTone}
            />
          </SpotlightCard>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {featureRows.row2.map((feature) => (
          <SpotlightCard
            key={feature.title}
            title={feature.title}
            body={feature.microCopy}
            badge={feature.statusTag}
            badgeTone={feature.badgeTone}
            className="min-h-[220px]"
            spotlightSize={300}
            ambientStrength={0.21}
          >
            <FeatureMeta
              iconKey={feature.iconKey}
              tone={feature.tone}
              signalState={feature.signalState}
              signalTone={feature.signalTone}
            />
          </SpotlightCard>
        ))}
      </div>

      <div className="mt-4">
        <SpotlightCard
          title={featureRows.row3.title}
          body={featureRows.row3.microCopy}
          badge={featureRows.row3.statusTag}
          badgeTone={featureRows.row3.badgeTone}
          className="min-h-[210px]"
          spotlightSize={420}
          ambientStrength={0.24}
        >
          <FeatureMeta
            iconKey={featureRows.row3.iconKey}
            tone={featureRows.row3.tone}
            signalState={featureRows.row3.signalState}
            signalTone={featureRows.row3.signalTone}
          />
        </SpotlightCard>
      </div>
    </BaselineContainer>
  );
}
