"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Mail } from "lucide-react";

const AUDIENCES = [
  "Protective Parents",
  "Family Attorneys",
  "Court Systems",
  "Nonprofits",
  "Guardians ad Litem",
  "Court Officers",
  "Law Enforcement",
];

export default function Hero() {
  const [idx, setIdx]           = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIdx((p) => (p + 1) % AUDIENCES.length);
        setAnimating(false);
      }, 500);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative pt-24 pb-0 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            transform: "perspective(500px) rotateX(60deg) translateY(-100px) scale(3)",
            transformOrigin: "top center",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-[#0a0f1e]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Floating logo */}
        <div className="relative mb-8 group cursor-default" style={{ animation: "fadeInUp 0.8s ease-out forwards" }}>
          <div className="absolute inset-0 bg-[#0ea5e9]/30 blur-3xl rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-700 animate-pulse-slow" />
          <div className="relative p-5 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl group-hover:border-[#0ea5e9]/30 transition-colors duration-500 shadow-2xl shadow-black/50 animate-float">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://assets.cotrackpro.com/CoTrackPro%2BLogo.jpg"
              alt="CoTrackPro Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-sm max-w-4xl"
          style={{ animation: "fadeInUp 0.8s ease-out 0.2s both" }}
        >
          Protect What Matters.
        </h1>

        <h2
          className="text-xl sm:text-2xl font-medium text-gray-300 mb-8 max-w-3xl leading-snug h-16 sm:h-auto flex flex-col sm:block items-center justify-center"
          style={{ animation: "fadeInUp 0.8s ease-out 0.4s both" }}
        >
          <span>Best-Interests Toolkits for </span>
          <span
            className={`inline-block font-bold text-[#38bdf8] transition-all duration-500 transform ${
              animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            {AUDIENCES[idx]}
          </span>
        </h2>

        <p
          className="max-w-3xl text-base sm:text-lg text-gray-300 mb-10 leading-relaxed"
          style={{ animation: "fadeInUp 0.8s ease-out 0.6s both" }}
        >
          We help family-practice professionals implement child-centered, trauma-informed support. Access a modern learning + action vault with{" "}
          <strong className="text-white font-semibold">Pathways</strong>,{" "}
          <strong className="text-white font-semibold">Playbooks</strong>,{" "}
          <strong className="text-white font-semibold">Checklists</strong>,{" "}
          <strong className="text-white font-semibold">Infographics</strong>,{" "}
          <strong className="text-white font-semibold">Videos</strong>,{" "}
          <strong className="text-white font-semibold">Podcasts</strong>, and{" "}
          <strong className="text-white font-semibold">Interactive Apps</strong>—built to help people respond faster, document better, and protect children under real-world pressure.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-20"
          style={{ animation: "fadeInUp 0.8s ease-out 0.8s both" }}
        >
          <Link
            href="/pricing"
            className="group relative overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />
            <span className="relative z-20 flex items-center gap-2">
              Get Access
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <a
            href="https://mailchi.mp/2ed059283bd7/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all transform hover:-translate-y-1 backdrop-blur-sm"
          >
            <Mail className="w-5 h-5" />
            Free Tips
          </a>
        </div>

        <div
          className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-12 text-sm font-medium text-gray-400"
          style={{ animation: "fadeInUp 0.8s ease-out 1s both" }}
        >
          {[
            { icon: "🔒", text: "Secure access" },
            { icon: "⚡", text: "Fast learning modules" },
            { icon: "📦", text: "Downloadable resources" },
            { icon: "🧭", text: "Best-interests pathways" },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
              <span>{icon}</span> {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
