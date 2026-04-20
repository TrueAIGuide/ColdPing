"use client";

import { useEffect } from "react";

const features = [
  {
    title: "LinkedIn-Powered Personalization",
    description:
      "Paste any LinkedIn profile and ColdPing extracts their achievements, recent posts, and career moves to craft a hook they'll actually notice.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
  {
    title: "3-Second Generation",
    description:
      "No waiting. No prompting back and forth. One click and your email is ready — personalized, concise, and under 150 words.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Tone Control",
    description:
      "Choose from Friendly, Professional, or Direct & Bold. The AI matches your brand voice every single time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    title: "Subject Line Included",
    description:
      "Every email comes with a high-converting subject line under 8 words — optimized for open rates, not just delivery.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
        <path d="M12 17l-1.5-1.5" /><path d="M12 17l1.5-1.5" />
      </svg>
    ),
  },
  {
    title: "No Templates, Ever",
    description:
      "Every email is generated fresh from the prospect's actual data. No one will ever receive the same email twice.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="11" x2="15" y2="17" />
        <line x1="15" y1="11" x2="9" y2="17" />
      </svg>
    ),
  },
  {
    title: "Completely Free to Start",
    description:
      "No credit card. No trial period. Use the tool right now, today — upgrade only when you need volume and automation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default function Features() {
  useEffect(() => {
    const container = document.getElementById("features-grid");
    if (!container) return;

    const children = container.querySelectorAll(".feature-card");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 100);
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
    <section id="features" className="py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark dark:text-dark-text mb-4">
            Everything you need to book more meetings
          </h2>
          <p className="text-muted dark:text-dark-muted text-base sm:text-lg max-w-2xl mx-auto">
            Built for founders, sales teams, and marketers who are tired of spray-and-pray outreach
          </p>
        </div>

        {/* Grid */}
        <div id="features-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card scroll-fade card-hover bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 sm:p-7"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-brand-light dark:bg-brand/10 flex items-center justify-center mb-4 text-brand">
                {feature.icon}
              </div>

              <h3 className="text-base font-bold text-dark dark:text-dark-text mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
