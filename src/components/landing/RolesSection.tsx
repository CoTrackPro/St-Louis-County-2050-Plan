"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { ROLES } from "@/data/roles";

export default function RolesSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const cx = e.clientX;
    const cy = e.clientY;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const { left, top } = target.getBoundingClientRect();
      target.style.setProperty("--mouse-x", `${cx - left}px`);
      target.style.setProperty("--mouse-y", `${cy - top}px`);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <section id="choose-your-path" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Choose Your Path</h2>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#fbbf24] text-sm font-semibold mb-8">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
          Designed for High-Conflict Strategy
        </div>

        <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
          Each membership is built around <strong className="text-white">Best Interests</strong>—what reduces harm and increases safety <em>right now</em>.
        </p>

        {/* Billing toggle */}
        <div className="relative inline-flex bg-white/5 p-1.5 rounded-full border border-white/10 cursor-pointer select-none">
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-[220ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              left: billing === "monthly" ? "6px" : "50%",
              width: "calc(50% - 6px)",
            }}
          />
          <button
            onClick={() => setBilling("monthly")}
            className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors ${billing === "monthly" ? "text-gray-900" : "text-gray-400 hover:text-white"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-colors ${billing === "yearly" ? "text-gray-900" : "text-gray-400 hover:text-white"}`}
          >
            Yearly
            <span className={`hidden sm:inline text-[10px] font-extrabold px-1.5 py-0.5 rounded ${billing === "yearly" ? "bg-gray-900/20 text-gray-900" : "bg-[#f59e0b] text-gray-900"}`}>
              Save
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {ROLES.map((role, i) => {
          const action = billing === "yearly" ? role.secondaryAction : role.primaryAction;
          return (
            <div
              key={role.id}
              onMouseMove={handleMouseMove}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl will-change-transform"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 opacity-100 transition-opacity" style={{ background: role.gradient }} />
              {/* Spotlight */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.04), transparent 40%)` }}
              />
              {/* Spotlight border */}
              <div
                className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 40%)`,
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "1px",
                }}
              />

              <div className="relative z-10 p-6 sm:p-10">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left: identity */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm text-white">
                        <role.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold text-white ${role.accentColor}`}>{role.title}</h3>
                        {role.subRoles && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {role.subRoles.slice(0, 3).join(" · ")}{role.subRoles.length > 3 ? " · more" : ""}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6">{role.description}</p>
                    <ul className="space-y-2">
                      {role.whyNow.map((w, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                          <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: CTA */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    {role.primaryAction && role.secondaryAction ? (
                      <>
                        {action && (
                          <a
                            href={action.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn relative overflow-hidden flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-white text-gray-900 font-bold text-base hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-0.5"
                          >
                            {action.label}
                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        )}
                        {/* Always show the other option as secondary */}
                        {(() => {
                          const other = billing === "yearly" ? role.primaryAction : role.secondaryAction;
                          return other ? (
                            <a
                              href={other.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-2xl border border-white/20 text-white/70 text-sm hover:text-white hover:border-white/40 transition-all"
                            >
                              {other.label}
                            </a>
                          ) : null;
                        })()}
                      </>
                    ) : role.singleAction ? (
                      // triggerModal → internal /contact, otherwise external link
                      role.singleAction.triggerModal ? (
                        <Link
                          href="/contact"
                          className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
                        >
                          {role.singleAction.label}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <a
                          href={role.singleAction.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
                        >
                          {role.singleAction.label}
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      )
                    ) : null}

                    <p className="text-center text-xs text-gray-500 mt-1">
                      Cancel anytime · Secure checkout via Stripe
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
