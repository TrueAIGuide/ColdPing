"use client";

import { useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target]);

  return (
    <span className="animate-count stagger-4">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-16">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="blob-1 absolute top-[-120px] left-1/4 w-[500px] h-[500px] rounded-full bg-brand/8 dark:bg-brand/15 blur-3xl" />
        <div className="blob-2 absolute bottom-[-100px] right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-400/8 dark:bg-indigo-500/15 blur-3xl" />
      </div>

      {/* Dot grid pattern */}
      <div className="absolute inset-0 -z-10 dot-grid opacity-40 dark:opacity-20" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-light dark:bg-brand/10 border border-brand/10 dark:border-brand/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-brand pulse-dot" />
          <span className="text-sm font-medium text-brand">
            ✦ Now in Beta — Join 500+ early users
          </span>
        </div>

        {/* H1 */}
        <h1 className="animate-fade-in-up stagger-1 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-dark dark:text-dark-text leading-[1.08] mb-6">
          Cold emails that
          <br />
          <span className="relative inline-block">
            <span className="text-brand">actually get replies</span>
            <span className="animate-underline" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up stagger-2 text-base sm:text-lg text-muted dark:text-dark-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop sending generic outreach. ColdPing reads your prospect&apos;s LinkedIn and writes
          a personalized email in 3 seconds — one that sounds like you actually did your homework.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-shimmer btn-press inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                       bg-brand text-white font-bold text-sm
                       hover:bg-brand-dark transition-all duration-200
                       shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 cursor-pointer"
          >
            Try It Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <button
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-press inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                       border-2 border-border dark:border-dark-border text-dark dark:text-dark-text font-bold text-sm
                       hover:border-brand hover:text-brand dark:hover:border-brand dark:hover:text-brand
                       transition-all duration-200 cursor-pointer"
          >
            See How It Works
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        {/* Social proof */}
        <div className="animate-fade-in-up stagger-4 flex flex-col items-center gap-4 mb-12">
          <div className="flex items-center gap-3">
            {/* Overlapping avatars */}
            <div className="flex -space-x-2">
              {["bg-brand", "bg-indigo-500", "bg-blue-400", "bg-sky-500", "bg-brand-dark"].map(
                (bg, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${bg} border-2 border-white dark:border-dark-bg flex items-center justify-center text-[10px] font-bold text-white`}
                  >
                    {["JR", "SM", "DK", "AK", "NR"][i]}
                  </div>
                )
              )}
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
              <span className="ml-1 text-sm font-semibold text-dark dark:text-dark-text">4.9/5</span>
            </div>
          </div>
          <p className="text-sm text-muted dark:text-dark-muted">
            Trusted by 500+ founders, marketers, and sales teams
          </p>
        </div>

        {/* Animated counter stats */}
        <div className="animate-fade-in-up stagger-5 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {[
            { target: 10000, suffix: "+", label: "Emails Generated" },
            { target: 3, suffix: " sec", label: "Average Time" },
            { target: 68, suffix: "%", label: "Open Rate" },
            { target: 0, suffix: "", label: "Cost to Start", display: "Free" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-sm rounded-xl border border-border dark:border-dark-border p-4"
            >
              <p className="text-xl sm:text-2xl font-extrabold text-dark dark:text-dark-text">
                {stat.display ? stat.display : <AnimatedCounter target={stat.target} suffix={stat.suffix} />}
              </p>
              <p className="text-xs text-muted dark:text-dark-muted mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
