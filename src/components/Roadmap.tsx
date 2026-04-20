"use client";

import { useEffect } from "react";

const phases = [
  {
    quarter: "Q1 2026",
    title: "Launched",
    status: "done",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    nodeColor: "bg-emerald-500",
    items: [
      "Core email generator",
      "LinkedIn paste input",
      "Gemini AI integration",
      "Tone selection",
      "Formspree waitlist",
    ],
  },
  {
    quarter: "Q2 2026",
    title: "In Progress",
    status: "active",
    badgeColor: "bg-brand/10 text-brand dark:bg-brand/20",
    nodeColor: "bg-brand",
    items: [
      "LinkedIn auto-lookup (no manual paste)",
      "Bulk generation from CSV",
      "Email history & saved drafts",
      "Chrome extension beta",
    ],
  },
  {
    quarter: "Q3 2026",
    title: "Coming Soon",
    status: "upcoming",
    badgeColor: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    nodeColor: "bg-gray-400 dark:bg-gray-600",
    items: [
      "Email sequences (multi-touch campaigns)",
      "A/B subject line testing",
      "CRM integrations (HubSpot, Pipedrive)",
      "Team workspace & collaboration",
    ],
  },
  {
    quarter: "Q4 2026",
    title: "On the Horizon",
    status: "upcoming",
    badgeColor: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    nodeColor: "bg-gray-400 dark:bg-gray-600",
    items: [
      "Full outreach automation",
      "AI reply detection & follow-up",
      "Custom AI tone training on your past emails",
      "API access for developers",
    ],
  },
];

export default function Roadmap() {
  useEffect(() => {
    const container = document.getElementById("roadmap-grid");
    if (!container) return;
    const children = container.querySelectorAll(".roadmap-card");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 150);
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="roadmap" className="py-20 sm:py-24 bg-card dark:bg-dark-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark dark:text-dark-text mb-4">
            What we&apos;re building next
          </h2>
          <p className="text-muted dark:text-dark-muted text-base sm:text-lg max-w-lg mx-auto">
            ColdPing is just getting started. Here&apos;s where we&apos;re taking it.
          </p>
        </div>

        {/* Timeline */}
        <div id="roadmap-grid" className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Horizontal connector line (desktop) */}
          <div className="hidden md:block absolute top-8 left-[calc(12.5%+12px)] right-[calc(12.5%+12px)] h-0.5 bg-border dark:bg-dark-border" />

          {/* Vertical connector line (mobile) */}
          <div className="md:hidden absolute top-0 bottom-0 left-5 w-0.5 bg-border dark:bg-dark-border" />

          {phases.map((phase) => (
            <div key={phase.quarter} className="roadmap-card scroll-fade relative pl-12 md:pl-0 md:pt-16">
              {/* Node (mobile = left, desktop = top) */}
              <div className="absolute md:top-4 md:left-1/2 md:-translate-x-1/2 left-3 top-0">
                <div className={`w-5 h-5 rounded-full border-4 border-white dark:border-dark-bg ${phase.nodeColor} ${phase.status === "active" ? "pulse-dot" : ""}`} />
              </div>

              {/* Card */}
              <div className="card-hover bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${phase.badgeColor}`}>
                    {phase.title} {phase.status === "done" ? "✓" : ""}
                  </span>
                </div>
                <p className="text-sm font-bold text-dark dark:text-dark-text mb-3">{phase.quarter}</p>
                <ul className="space-y-1.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-muted dark:text-dark-muted">
                      <span className="text-brand mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
