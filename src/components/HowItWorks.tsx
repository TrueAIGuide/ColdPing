"use client";

import { useEffect } from "react";

const steps = [
  {
    number: "1",
    title: "Paste LinkedIn",
    description: "Copy any profile in 10 seconds",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Add your details",
    description: "Your product, offer, tone",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Get your email",
    description: "Gemini writes something that feels human",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  useEffect(() => {
    const container = document.getElementById("steps-grid");
    if (!container) return;
    const children = container.querySelectorAll(".step-card");
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
    <section id="how-it-works" className="py-20 sm:py-24 bg-card dark:bg-dark-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark dark:text-dark-text mb-4">
            How it works
          </h2>
          <p className="text-muted dark:text-dark-muted text-base sm:text-lg max-w-md mx-auto">
            Three simple steps to a perfectly personalized cold email.
          </p>
        </div>

        <div id="steps-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="step-card scroll-fade relative card-hover bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 sm:p-8"
            >
              <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-brand text-white text-xs font-bold">
                {step.number}
              </div>
              <div className="w-12 h-12 rounded-xl bg-brand-light dark:bg-brand/10 flex items-center justify-center mb-4 text-brand group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-base font-bold text-dark dark:text-dark-text mb-1.5">{step.title}</h3>
              <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-5 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
