"use client";

import { useEffect } from "react";

const testimonials = [
  {
    name: "James R.",
    title: "Founder, B2B SaaS",
    initials: "JR",
    color: "bg-brand",
    quote: "I sent 20 emails in the time it used to take me to write one. Two of them booked calls the same day. This thing is stupid good.",
  },
  {
    name: "Sofia M.",
    title: "Head of Growth, Series A Startup",
    initials: "SM",
    color: "bg-indigo-500",
    quote: "The hooks it pulls from LinkedIn are genuinely impressive. One prospect replied saying it was the best cold email they'd ever gotten. I screenshot it.",
  },
  {
    name: "David K.",
    title: "Sales Lead, SaaS Agency",
    initials: "DK",
    color: "bg-brand",
    quote: "We replaced our entire cold email process with this. Our reply rate went from 3% to 19% in the first two weeks.",
  },
];

export default function Testimonials() {
  useEffect(() => {
    const container = document.getElementById("testimonials-grid");
    if (!container) return;
    const children = container.querySelectorAll(".testimonial-card");
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
    <section className="py-20 sm:py-24 bg-card dark:bg-dark-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark dark:text-dark-text mb-4">
            What early users are saying
          </h2>
        </div>

        <div id="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card scroll-fade card-hover bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 sm:p-7"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base italic text-dark dark:text-dark-text leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-xs font-bold text-white`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-dark dark:text-dark-text">{t.name}</p>
                  <p className="text-xs text-muted dark:text-dark-muted">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
