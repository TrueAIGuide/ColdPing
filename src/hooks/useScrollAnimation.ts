"use client";

import { useEffect, useRef } from "react";

export function useScrollAnimation<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export function useStaggerAnimation(containerSelector: string, childSelector: string, staggerMs = 50) {
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const children = container.querySelectorAll(childSelector);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add("visible");
            }, i * staggerMs);
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [containerSelector, childSelector, staggerMs]);
}
