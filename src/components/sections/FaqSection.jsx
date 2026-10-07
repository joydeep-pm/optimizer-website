import { motion } from "framer-motion";
import AccordionItem from "../ui/AccordionItem";
import { faqList } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

export default function FaqSection() {
  return (
    <section id="faq" className="mx-auto w-full max-w-[1240px] px-4 py-16 md:px-8 md:py-20">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-white/48">FAQ</p>
        <h2 className="display-font mt-3 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          What you should know before joining
        </h2>
      </motion.header>

      <div className="mt-8 border-t border-white/12">
        {faqList.map((item, index) => (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.04, ease: EASE }}
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
