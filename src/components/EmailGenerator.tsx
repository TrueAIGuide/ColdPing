"use client";

import { useState } from "react";

interface GeneratedEmail {
  subject: string;
  body: string;
  score: number;
}

export default function EmailGenerator() {
  const [linkedinText, setLinkedinText] = useState("");
  const [product, setProduct] = useState("");
  const [cta, setCta] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedEmail | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!linkedinText.trim() || !product.trim() || !cta.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedinText, product, cta, tone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }
      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    const fullEmail = `Subject: ${result.subject}\n\n${result.body}`;
    await navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setResult(null);
    handleGenerate();
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800";
    if (score >= 70) return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
    return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
  };

  return (
    <section id="tool" className="py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* ═══ LEFT — Inputs ═══ */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-dark dark:text-dark-text mb-1">Email Generator</h2>
            <p className="text-sm text-muted dark:text-dark-muted mb-6">Fill in the details to generate your personalized email.</p>

            <div className="mb-4">
              <label htmlFor="linkedin-text" className="block text-sm font-semibold text-dark dark:text-dark-text mb-1.5">Paste LinkedIn profile text</label>
              <textarea
                id="linkedin-text"
                rows={8}
                value={linkedinText}
                onChange={(e) => setLinkedinText(e.target.value)}
                placeholder="Go to any LinkedIn profile → Ctrl+A → Ctrl+C → paste here"
                className="w-full rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-bg px-4 py-3 text-sm text-dark dark:text-dark-text placeholder-muted/60 dark:placeholder-dark-muted/60 resize-none transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="product-input" className="block text-sm font-semibold text-dark dark:text-dark-text mb-1.5">Your product or service</label>
              <input
                id="product-input"
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. AI analytics dashboard for SaaS teams"
                className="w-full rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-bg px-4 py-3 text-sm text-dark dark:text-dark-text placeholder-muted/60 dark:placeholder-dark-muted/60 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cta-input" className="block text-sm font-semibold text-dark dark:text-dark-text mb-1.5">Your CTA</label>
              <input
                id="cta-input"
                type="text"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                placeholder="e.g. Book a 15-min demo"
                className="w-full rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-bg px-4 py-3 text-sm text-dark dark:text-dark-text placeholder-muted/60 dark:placeholder-dark-muted/60 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="tone-select" className="block text-sm font-semibold text-dark dark:text-dark-text mb-1.5">Tone</label>
              <select
                id="tone-select"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-bg px-4 py-3 text-sm text-dark dark:text-dark-text transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_12px_center]"
              >
                <option value="Friendly & casual">Friendly &amp; casual</option>
                <option value="Professional">Professional</option>
                <option value="Direct & bold">Direct &amp; bold</option>
              </select>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">{error}</div>
            )}

            <button
              id="generate-btn"
              onClick={handleGenerate}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand text-white font-bold text-sm
                         hover:bg-brand-dark transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-brand/20
                         btn-press btn-shimmer disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <><span className="spinner" /><span>Generating...</span></>
              ) : (
                <>
                  <span>Generate Email</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* ═══ RIGHT — Output ═══ */}
          <div className={`rounded-2xl border p-6 sm:p-8 transition-all duration-500 min-h-[400px] flex flex-col ${
            loading
              ? "border-brand/30 bg-brand-light/30 dark:bg-brand/5 dark:border-brand/20 pulse-glow"
              : result
              ? "border-border dark:border-dark-border bg-white dark:bg-dark-card shadow-sm"
              : "border-dashed border-gray-300 dark:border-dark-border bg-card dark:bg-dark-card/50"
          }`}>
            {/* Empty State */}
            {!loading && !result && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-light dark:bg-brand/10 flex items-center justify-center mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <p className="text-muted dark:text-dark-muted text-sm font-medium">Your personalized email will appear here</p>
                <p className="text-muted/60 dark:text-dark-muted/60 text-xs mt-1">Fill in the form and click Generate</p>
              </div>
            )}

            {/* Loading — Skeleton */}
            {loading && (
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <div className="skeleton h-3 w-20 mb-2" />
                  <div className="skeleton h-5 w-3/4" />
                </div>
                <div className="h-px bg-gray-100 dark:bg-dark-border" />
                <div className="flex-1 flex flex-col gap-3">
                  <div className="skeleton h-3 w-16 mb-1" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-5/6" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-4/5" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-2/3" />
                </div>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="spinner-blue" />
                  <span className="text-sm text-brand font-medium">Analyzing profile &amp; crafting personalization...</span>
                </div>
              </div>
            )}

            {/* Result */}
            {result && !loading && (
              <div className="animate-fade-in-up flex flex-col flex-1">
                <div className="mb-5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-dark-muted">Subject Line</span>
                  <p className="mt-1 text-base font-bold text-dark dark:text-dark-text leading-snug">{result.subject}</p>
                </div>
                <div className="w-full h-px bg-gray-100 dark:bg-dark-border mb-5" />
                <div className="flex-1 mb-5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-dark-muted">Email Body</span>
                  <div className="mt-2 text-sm text-dark dark:text-dark-text leading-[1.8] whitespace-pre-line">{result.body}</div>
                </div>
                <div className="w-full h-px bg-gray-100 dark:bg-dark-border mb-4" />
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <button id="copy-btn" onClick={handleCopy}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-all duration-200 btn-press cursor-pointer">
                      {copied ? (
                        <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Copied!</>
                      ) : (
                        <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>Copy Email</>
                      )}
                    </button>
                    <button id="regenerate-btn" onClick={handleRegenerate}
                      className="text-sm text-brand font-medium hover:text-brand-dark transition-colors duration-200 underline underline-offset-2 cursor-pointer">
                      Regenerate
                    </button>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${getScoreColor(result.score)}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                    {result.score}% personalized
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
