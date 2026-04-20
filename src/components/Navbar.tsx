"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sectionIds = ["features", "how-it-works", "roadmap", "pricing", "waitlist"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`animate-slide-down sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl shadow-sm border-b border-border dark:border-dark-border"
          : "bg-white dark:bg-dark-bg border-b border-gray-100 dark:border-dark-border/50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-0 group shrink-0">
            <span className="text-xl font-bold tracking-tight text-dark dark:text-dark-text">
              ColdPin
            </span>
            <span className="text-xl font-bold tracking-tight text-dark dark:text-dark-text">
              g
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand ml-[1px] translate-y-[3px] group-hover:scale-125 transition-transform duration-200" />
          </a>

          {/* Center links (desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.href === `#${activeSection}`;
              const isExternal = !link.href.startsWith("#");
              return isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link px-3 py-2 text-sm font-medium text-muted dark:text-dark-muted hover:text-dark dark:hover:text-dark-text transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`nav-link px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "active text-brand"
                      : "text-muted dark:text-dark-muted hover:text-dark dark:hover:text-dark-text"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors cursor-pointer"
              >
                {resolvedTheme === "dark" ? (
                  <svg
                    key="sun"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-dark-muted theme-icon-enter"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg
                    key="moon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted theme-icon-enter"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}

            {/* Waitlist CTA (desktop) */}
            <button
              onClick={() => handleNavClick("#waitlist")}
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-lg bg-brand text-white text-sm font-semibold
                         hover:bg-brand-dark transition-all duration-200 shadow-sm hover:shadow-md
                         btn-press btn-shimmer cursor-pointer"
            >
              Join Waitlist
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-dark dark:text-dark-text"
              >
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden menu-slide border-t border-border dark:border-dark-border pb-4">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => {
                const isExternal = !link.href.startsWith("#");
                return isExternal ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2.5 text-sm font-medium text-muted dark:text-dark-muted hover:text-dark dark:hover:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-card rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-3 py-2.5 text-sm font-medium text-muted dark:text-dark-muted hover:text-dark dark:hover:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-card rounded-lg transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                );
              })}
              <button
                onClick={() => handleNavClick("#waitlist")}
                className="mt-2 mx-3 px-5 py-2.5 rounded-lg bg-brand text-white text-sm font-semibold text-center
                           hover:bg-brand-dark transition-all duration-200 cursor-pointer"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
