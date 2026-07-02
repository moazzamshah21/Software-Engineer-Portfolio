export const GSAP_DEFAULTS = {
  ease: "power3.out",
  duration: 0.8,
} as const;

export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;

export const LOADING_DURATION = 2800;

export const SCROLL_TRIGGER_DEFAULTS = {
  start: "top 85%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
} as const;
