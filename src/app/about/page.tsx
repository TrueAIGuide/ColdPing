"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  {
    title: "Humans First",
    description: "We build AI tools that make humans better at their jobs, not tools that replace the human touch. Every email ColdPing writes still needs you to hit send.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: "Radical Simplicity",
    description: "No dashboards. No setup. No learning curve. You land on the page and you're already using the product. That's the standard we hold ourselves to.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    title: "Privacy by Default",
    description: "Your API keys never touch the browser. Your prospect data is never stored. We built the architecture right from day one.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const team = [
  {
    name: "Alex Kim",
    title: "Co-founder & Product",
    initials: "AK",
    color: "bg-brand",
    bio: "Previously led growth at two B2B SaaS companies. Sent (and received) way too many bad cold emails before building this.",
  },
  {
    name: "Nina Rao",
    title: "Co-founder & Engineering",
    initials: "NR",
    color: "bg-indigo-500",
    bio: "Full-stack engineer obsessed with AI tooling. Built ColdPing's core engine in a single weekend using Next.js and Gemini.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="absolute inset-0 -z-10">
            <div className="blob-1 absolute top-[-100px] left-1/3 w-[500px] h-[400px] rounded-full bg-brand/8 dark:bg-brand/15 blur-3xl" />
            <div className="blob-2 absolute bottom-[-80px] right-1/3 w-[350px] h-[350px] rounded-full bg-indigo-400/8 dark:bg-indigo-500/15 blur-3xl" />
          </div>
          <div className="absolute inset-0 -z-10 dot-grid opacity-30 dark:opacity-15" />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-dark dark:text-dark-text leading-[1.1] mb-6">
              Built by builders,
              <br />
              <span className="text-brand">for builders</span>
            </h1>
            <p className="animate-fade-in-up stagger-1 text-base sm:text-lg text-muted dark:text-dark-muted max-w-2xl mx-auto leading-relaxed">
              ColdPing was born out of frustration. We were spending hours writing cold emails that sounded like
              everyone else&apos;s. So we built the tool we wished existed.
            </p>
          </div>
        </section>

        {/* ═══ OUR STORY ═══ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-dark dark:text-dark-text mb-6">Our Story</h2>
                <div className="space-y-4 text-sm sm:text-base text-muted dark:text-dark-muted leading-relaxed">
                  <p>
                    Cold outreach is broken. Most tools give you templates that prospects have seen a hundred times.
                    The ones that actually work — the ones that get replies — are hyper-specific, reference something
                    real about the person, and sound like they came from a human who actually did their homework.
                  </p>
                  <p>
                    We built ColdPing to make that level of personalization available to everyone, not just the
                    salespeople who spend 20 minutes researching each prospect. Paste a LinkedIn profile, hit generate,
                    and you get something that feels personal — because it is.
                  </p>
                </div>
              </div>

              {/* Abstract SVG illustration */}
              <div className="flex items-center justify-center">
                <div className="relative w-80 h-72">
                  <div className="absolute inset-0 bg-brand-light dark:bg-brand/10 rounded-3xl" />
                  <svg viewBox="0 0 320 272" fill="none" className="absolute inset-0 w-full h-full">
                    <circle cx="160" cy="136" r="80" fill="none" stroke="#2563EB" strokeWidth="2" opacity="0.3" />
                    <circle cx="160" cy="136" r="50" fill="none" stroke="#2563EB" strokeWidth="2" opacity="0.2" />
                    <circle cx="160" cy="136" r="20" fill="#2563EB" opacity="0.15" />
                    <rect x="60" y="60" width="40" height="40" rx="8" fill="#2563EB" opacity="0.1" />
                    <rect x="220" y="180" width="35" height="35" rx="8" fill="#2563EB" opacity="0.1" />
                    <circle cx="80" cy="200" r="15" fill="#2563EB" opacity="0.08" />
                    <circle cx="240" cy="80" r="18" fill="#2563EB" opacity="0.08" />
                    <path d="M100 136 L140 136" stroke="#2563EB" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
                    <path d="M180 136 L220 136" stroke="#2563EB" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
                    <path d="M160 96 L160 56" stroke="#2563EB" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
                    <path d="M160 176 L160 216" stroke="#2563EB" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ VALUES ═══ */}
        <section className="py-16 sm:py-20 bg-card dark:bg-dark-card/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark dark:text-dark-text mb-10 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="card-hover bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 sm:p-7"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-light dark:bg-brand/10 flex items-center justify-center mb-4 text-brand">
                    {v.icon}
                  </div>
                  <h3 className="text-base font-bold text-dark dark:text-dark-text mb-2">{v.title}</h3>
                  <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TEAM ═══ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark dark:text-dark-text mb-10 text-center">
              Who&apos;s behind ColdPing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {team.map((t) => (
                <div
                  key={t.name}
                  className="card-hover bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 sm:p-7 text-center"
                >
                  <div className={`w-16 h-16 rounded-full ${t.color} flex items-center justify-center text-lg font-bold text-white mx-auto mb-4`}>
                    {t.initials}
                  </div>
                  <h3 className="text-base font-bold text-dark dark:text-dark-text">{t.name}</h3>
                  <p className="text-xs text-brand font-semibold mb-3">{t.title}</p>
                  <p className="text-sm text-muted dark:text-dark-muted leading-relaxed">{t.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ MISSION BANNER ═══ */}
        <section className="bg-dark text-white py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-snug mb-4">
              &ldquo;Our mission is to make every cold email feel like it was written by someone who actually cares.&rdquo;
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Join 500+ early users already using ColdPing
            </p>
            <a
              href="/#tool"
              className="btn-shimmer btn-press inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand text-white font-bold text-sm
                         hover:bg-brand-dark transition-all duration-200 shadow-lg shadow-brand/20"
            >
              Try It Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
