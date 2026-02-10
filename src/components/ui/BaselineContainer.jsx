export default function BaselineContainer({
  id,
  tone = "teal",
  className = "",
  children,
}) {
  return (
    <section id={id} className="baseline-shell">
      <div
        className={`baseline-grid section-shell section-tone-${tone} rounded-3xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8 ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
