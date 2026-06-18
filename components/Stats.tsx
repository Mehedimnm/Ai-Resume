const stats = [
  { value: "4", label: "Premium templates" },
  { value: "AI", label: "Writes every resume" },
  { value: "ATS", label: "Optimized formatting" },
  { value: "< 5 min", label: "From start to PDF" },
];

export default function Stats() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="container-page grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-extrabold text-brand-600 sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
