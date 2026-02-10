export default function SectionIntro({
  eyebrow,
  title,
  body,
  className = "",
  titleClassName = "",
  bodyClassName = "",
}) {
  return (
    <header className={`baseline-intro ${className}`}>
      {eyebrow ? (
        <p className="text-left text-xs uppercase tracking-[0.2em] text-white/55">{eyebrow}</p>
      ) : null}
      <h2
        className={`display-font mt-4 text-balance text-center text-3xl font-bold tracking-tight text-white md:text-5xl ${titleClassName}`}
      >
        {title}
      </h2>
      {body ? (
        <p className={`mt-3 max-w-3xl text-left text-base leading-relaxed text-white/72 ${bodyClassName}`}>
          {body}
        </p>
      ) : null}
    </header>
  );
}
