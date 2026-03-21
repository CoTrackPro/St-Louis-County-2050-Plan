import { IMPACT_METRICS } from "@/data/content";

export default function ImpactMetrics() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {IMPACT_METRICS.map((metric, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#0ea5e9]/30 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#38bdf8] mb-4 group-hover:bg-[#0ea5e9]/20 transition-colors">
                <metric.icon className="w-7 h-7" />
              </div>
              <div className="text-4xl font-extrabold text-white mb-1">{metric.value}</div>
              <div className="text-[#38bdf8] font-semibold text-sm mb-2">{metric.label}</div>
              <p className="text-gray-500 text-xs leading-relaxed">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
