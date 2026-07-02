"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";

const NAV_OFFSET = -88;

type ScrollToOptions = {
  offset?: number;
  duration?: number;
};

type LenisContextValue = {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: ScrollToOptions
  ) => void;
};

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenisContext() {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenisContext must be used within LenisProvider");
  }
  return context;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    registerGsapPlugins();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: ScrollToOptions) => {
      lenisRef.current?.scrollTo(target, {
        offset: options?.offset ?? NAV_OFFSET,
        duration: options?.duration ?? 1.5,
      });
    },
    []
  );

  return (
    <LenisContext.Provider value={{ scrollTo }}>{children}</LenisContext.Provider>
  );
}
