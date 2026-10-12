import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { carouselCards, pickerSpends } from "../content/siteContent";

const FAN = [
  { x: "-34%", rotate: -11, y: 14 },
  { x: "0%", rotate: 0, y: 0 },
  { x: "34%", rotate: 11, y: 14 },
];

export default function CardFanPicker() {
  const [active, setActive] = useState(1);
  const reduceMotion = useReducedMotion();
  const spend = pickerSpends[active];
  const winner = carouselCards[spend.winner];

  return (
    <div className="rounded-[2rem] bg-ink p-5 text-white md:p-7">
      <div className="flex items-center justify-between">
        <p className="label text-violet-soft">Try it</p>
        <p className="label text-white/60">Illustration</p>
      </div>

      <p className="display-font mt-3 text-2xl font-bold leading-tight md:text-3xl">I am paying for&hellip;</p>

      <div role="group" aria-label="Choose what you are paying for" className="mt-4 flex flex-wrap gap-2">
        {pickerSpends.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              active === index
                ? "border-violet bg-violet text-white"
                : "border-white/25 text-white/85 hover:border-white/60"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative mx-auto mt-6 h-[210px] w-full max-w-[420px] md:h-[250px]">
        {carouselCards.map((card, index) => {
          const isWinner = index === spend.winner;
          const base = FAN[index];
          return (
            <motion.img
              key={card.id}
              src={card.textureUrl}
              alt={`${card.name}, illustrative card`}
              className="absolute left-[16%] top-4 w-[68%] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
              initial={false}
              animate={{
                x: base.x,
                y: isWinner ? -14 : base.y,
                rotate: isWinner ? 0 : base.rotate,
                scale: isWinner ? 1.1 : 0.94,
                opacity: isWinner ? 1 : 0.55,
                zIndex: isWinner ? 30 : index,
              }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 22 }}
            />
          );
        })}
      </div>

      <div role="status" aria-live="polite" className="mt-5 border-t border-white/15 pt-4">
        <p className="label text-white/60">Leads here</p>
        <p className="display-font mt-1 text-2xl font-bold">{winner.name}</p>
        <p className="mt-1 text-base text-white/80">{spend.why}</p>
        <p className="mt-3 text-sm text-white/55">
          Illustration only. Real recommendations depend on your cards and current issuer terms.
        </p>
      </div>
    </div>
  );
}
