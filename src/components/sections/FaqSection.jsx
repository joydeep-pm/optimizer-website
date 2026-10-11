import { motion } from "framer-motion";
import AccordionItem from "../ui/AccordionItem";
import { faqList } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

export default function FaqSection() {
  return (
    <section id="faq" className="mx-auto w-full max-w-[1240px] px-4 py-14 md:px-8 md:py-20">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="text-left"
      >
        <p className="text-left text-sm uppercase tracking-[0.2em] text-[#b49cff]">FAQ</p>
        <h2 className="display-font mt-3 max-w-4xl text-left text-4xl font-bold tracking-tight text-white md:text-6xl">
          Questions before you join
        </h2>
        <p className="mt-4 max-w-3xl text-left text-lg leading-relaxed text-white/75">
          Short answers to what people ask first.
        </p>
      </motion.header>

      <div className="mt-8 border-t border-white/14">
        {faqList.map((item, index) => (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: index * 0.05, ease: EASE }}
          >
            <AccordionItem
              question={item.question}
              answer={item.answer}
              tag={item.tag}
              defaultOpen={index === 0}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
