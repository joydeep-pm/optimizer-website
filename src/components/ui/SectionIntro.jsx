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
        <p className="text-left text-sm uppercase tracking-[0.2em] text-[#b49cff]">{eyebrow}</p>
      ) : null}
      <h2
        className={`display-font mt-4 text-balance text-center text-3xl font-bold tracking-tight text-white md:text-5xl ${titleClassName}`}
      >
        {title}
      </h2>
      {body ? (
        <p className={`mt-3 max-w-3xl text-left text-lg leading-relaxed text-white/75 ${bodyClassName}`}>
          {body}
        </p>
      ) : null}
    </header>
  );
}
