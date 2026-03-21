import { DETAILED_SCHEDULE } from "@/data/content";

export default function WhyThisExists() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Why This Exists
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto">
            The first 5 days after a high-conflict incident define everything.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Most families lose critical evidence, miss documentation windows, and make emotion-driven decisions in the first week. CoTrackPro gives you a structured path through the chaos — starting on day one.
          </p>
        </div>

        <div className="space-y-4">
          {DETAILED_SCHEDULE.map((item, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-start gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                  {item.day}
                </div>
                <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-2">{item.action}</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-[#0ea5e9]/10 text-[#38bdf8] border border-[#0ea5e9]/20 font-medium">
                    🛠 {item.tool}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
                    ✅ {item.win}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Start any time. The toolkit is always ready.
          </p>
        </div>
      </div>
    </section>
  );
}
