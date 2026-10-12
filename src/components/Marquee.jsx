import { marqueeItems } from "../content/siteContent";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden bg-ink py-5" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="display-font flex items-center gap-8 pr-8 text-3xl font-bold text-white md:text-5xl">
            {item}
            <span className="text-violet">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
