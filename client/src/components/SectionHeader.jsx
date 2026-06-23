export default function SectionHeader({ eyebrow, title, text, align = "center" }) {
  return (
    <div className={`mx-auto mb-12 max-w-3xl ${align === "center" ? "text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl dark:text-white">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{text}</p>}
    </div>
  );
}
