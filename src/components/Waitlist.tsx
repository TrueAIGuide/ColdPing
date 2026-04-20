"use client";

import { useState, type FormEvent } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list! We'll be in touch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <section id="waitlist" className="py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-xl mx-auto text-center">
          <div className="absolute inset-0 -z-10 -m-8">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-white dark:from-brand/5 dark:to-dark-bg rounded-3xl" />
          </div>

          <div className="relative bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-8 sm:p-12 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-brand-light dark:bg-brand/10 flex items-center justify-center mx-auto mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark dark:text-dark-text mb-3">Get early access</h2>
            <p className="text-muted dark:text-dark-muted text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
              Be first when we launch paid plans with LinkedIn auto-lookup and email sequences.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="flex-1 rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-bg px-4 py-3 text-sm text-dark dark:text-dark-text placeholder-muted/60 dark:placeholder-dark-muted/60 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
              />
              <button
                id="waitlist-btn"
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-xl bg-brand text-white text-sm font-bold hover:bg-brand-dark transition-all duration-200 shadow-sm hover:shadow-md btn-press btn-shimmer disabled:opacity-70 whitespace-nowrap cursor-pointer"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2"><span className="spinner !w-4 !h-4" />Joining...</span>
                ) : "Join Waitlist"}
              </button>
            </form>

            {status === "success" && (
              <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400 animate-fade-in-up">✓ {message}</p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm font-medium text-red-600 dark:text-red-400 animate-fade-in-up">{message}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
