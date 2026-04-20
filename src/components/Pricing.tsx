"use client";

import { useState, useEffect } from "react";

const plans = [
  {
    name: "Free",
    badge: "Current Plan",
    badgeColor: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    monthly: 0,
    annual: 0,
    priceLabel: "forever",
    features: [
      { text: "20 email generations per day", included: true },
      { text: "All 3 tone options", included: true },
      { text: "Subject line included", included: true },
      { text: "Copy to clipboard", included: true },
      { text: "LinkedIn auto-lookup", included: false },
      { text: "Email sequences", included: false },
      { text: "API access", included: false },
    ],
    cta: "Get Started Free",
    ctaStyle: "outline",
    highlighted: false,
  },
  {
    name: "Pro",
    badge: "Most Popular",
    badgeColor: "bg-brand/10 text-brand dark:bg-brand/20",
    monthly: 29,
    annual: 17,
    priceLabel: "month",
    features: [
      { text: "Unlimited generations", included: true },
      { text: "LinkedIn auto-lookup (coming soon)", included: true },
      { text: "Email sequences (coming soon)", included: true },
      { text: "Custom tone training", included: true },
      { text: "CSV export", included: true },
      { text: "Priority support", included: true },
      { text: "API access", included: false },
    ],
    cta: "Join Waitlist for Pro",
    ctaStyle: "solid",
    highlighted: true,
  },
  {
    name: "Team",
    badge: "For Teams",
    badgeColor: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    monthly: 79,
    annual: 47,
    priceLabel: "month",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "5 team seats", included: true },
      { text: "API access", included: true },
      { text: "Zapier integration (coming soon)", included: true },
      { text: "Dedicated onboarding", included: true },
      { text: "Custom branding", included: true },
    ],
    cta: "Contact Us",
    ctaStyle: "outline",
    highlighted: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    const container = document.getElementById("pricing-grid");
    if (!container) return;
    const children = container.querySelectorAll(".pricing-card");
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
    <section id="pricing" className="py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark dark:text-dark-text mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-muted dark:text-dark-muted text-base sm:text-lg">
            Start free. Scale when you&apos;re ready.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm font-medium ${!annual ? "text-dark dark:text-dark-text" : "text-muted dark:text-dark-muted"}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${annual ? "bg-brand" : "bg-gray-300 dark:bg-dark-border"}`}
            aria-label="Toggle billing period"
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${annual ? "translate-x-6" : "translate-x-0"}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-dark dark:text-dark-text" : "text-muted dark:text-dark-muted"}`}>Annual</span>
          {annual && (
            <span className="text-xs font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-full animate-fade-in-up">Save 40%</span>
          )}
        </div>

        <div id="pricing-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card scroll-fade card-hover rounded-2xl border p-6 sm:p-8 ${
                plan.highlighted
                  ? "border-brand shadow-lg shadow-brand/10 dark:shadow-brand/5 bg-white dark:bg-dark-card relative"
                  : "border-border dark:border-dark-border bg-white dark:bg-dark-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-px left-0 right-0 h-1 bg-brand rounded-t-2xl" />
              )}

              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-dark dark:text-dark-text">{plan.name}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${plan.badgeColor}`}>{plan.badge}</span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-dark dark:text-dark-text transition-all duration-300">
                    ${plan.monthly === 0 ? 0 : annual ? plan.annual : plan.monthly}
                  </span>
                  <span className="text-sm text-muted dark:text-dark-muted">
                    / {plan.priceLabel}
                  </span>
                </div>
                {annual && plan.monthly > 0 && (
                  <p className="text-xs text-muted dark:text-dark-muted mt-1">billed annually</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5 text-sm">
                    {f.included ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand mt-0.5 shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted/40 dark:text-dark-muted/40 mt-0.5 shrink-0">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                    <span className={f.included ? "text-dark dark:text-dark-text" : "text-muted/60 dark:text-dark-muted/60"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  if (plan.name === "Free") {
                    document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 btn-press cursor-pointer ${
                  plan.ctaStyle === "solid"
                    ? "bg-brand text-white hover:bg-brand-dark shadow-md hover:shadow-lg btn-shimmer"
                    : "border-2 border-border dark:border-dark-border text-dark dark:text-dark-text hover:border-brand hover:text-brand dark:hover:border-brand dark:hover:text-brand"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
