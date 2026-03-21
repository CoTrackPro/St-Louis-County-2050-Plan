import { TESTIMONIALS } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Real Stories. Real Results.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From protective parents to seasoned attorneys — CoTrackPro is changing outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <blockquote className="text-gray-300 leading-relaxed mb-6 flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.author}</p>
                  <p className="text-[#38bdf8] text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
