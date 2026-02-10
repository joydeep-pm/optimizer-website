import AccordionItem from "../ui/AccordionItem";
import BaselineContainer from "../ui/BaselineContainer";
import SectionIntro from "../ui/SectionIntro";
import { faqList } from "../../content/siteContent";

export default function FaqSection() {
  return (
    <BaselineContainer id="faq" tone="teal">
      <SectionIntro
        eyebrow="FAQ"
        title="Compact answers for practical pre-join questions"
        body="Scan the key decision points quickly and expand only what you need."
        titleClassName="max-w-4xl"
      />

      <div className="mt-8 space-y-3">
        {faqList.map((item, index) => (
          <AccordionItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            tag={item.tag}
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </BaselineContainer>
  );
}
