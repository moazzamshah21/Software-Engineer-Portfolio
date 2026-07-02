"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { heroContent } from "@/content/hero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";

const HeroCrystalScene = dynamic(
  () => import("@/components/three/HeroCrystal").then((m) => m.HeroCrystalScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-surface-raised border border-glass-border animate-pulse" />
    ),
  }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const tl = gsap.timeline({ delay: 3.2 });

    tl.fromTo(
      ".hero-badge",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    tl.fromTo(
      ".hero-name .char",
      { y: "120%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, stagger: 0.025, ease: "power4.out" },
      "-=0.3"
    );

    tl.fromTo(
      ".hero-sub",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );

    tl.fromTo(
      ".hero-tag",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(
      ".hero-desc",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    tl.fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.2"
    );

    tl.fromTo(
      ".hero-3d",
      { opacity: 0, scale: 0.85, x: 40 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power3.out" },
      "-=1.2"
    );
  }, []);

  const nameParts = heroContent.name.split(" ");
  const lastName = nameParts.pop() ?? "";
  const firstNames = nameParts.join(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center section-padding pt-28 md:pt-32"
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 xl:gap-20 items-center">
          <div className="relative z-10 order-2 lg:order-1">
            <div className="hero-badge opacity-0 mb-8">
              <span className="badge-pill">
                <span className="badge-dot" />
                Available for new projects
              </span>
            </div>

            <h1 className="hero-name font-display font-light leading-[1.05] tracking-tight">
              <span className="block text-4xl sm:text-5xl md:text-6xl text-foreground/90 mb-1">
                {firstNames.split("").map((char, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <span className="char inline-block">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  </span>
                ))}
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground">
                {lastName.split("").map((char, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <span className="char inline-block">{char}</span>
                  </span>
                ))}
              </span>
            </h1>

            <p className="hero-sub mt-6 text-xl md:text-2xl font-light text-foreground opacity-0">
              {heroContent.subtitle}
            </p>

            <p className="hero-tag mt-3 text-muted text-base md:text-lg opacity-0 flex items-center gap-2 flex-wrap font-light">
              {heroContent.tagline.split(" • ").map((item, i, arr) => (
                <span key={item} className="flex items-center gap-2">
                  <span>{item}</span>
                  {i < arr.length - 1 && (
                    <span className="text-subtle hidden sm:inline">•</span>
                  )}
                </span>
              ))}
            </p>

            <p className="hero-desc mt-8 text-muted text-base md:text-lg max-w-md leading-relaxed opacity-0 text-balance font-light">
              {heroContent.description}
            </p>

            <div className="mt-10 flex flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <MagneticButton
                href={heroContent.cta.primary.href}
                variant="primary"
                size="lg"
                className="hero-cta opacity-0 w-full sm:w-auto"
              >
                {heroContent.cta.primary.label}
                <FiArrowRight size={18} />
              </MagneticButton>
              <MagneticButton
                href={heroContent.cta.secondary.href}
                variant="secondary"
                size="lg"
                className="hero-cta opacity-0 w-full sm:w-auto"
              >
                {heroContent.cta.secondary.label}
              </MagneticButton>
            </div>
          </div>

          <div className="hero-3d relative order-1 lg:order-2 opacity-0">
            <div className="relative h-[320px] sm:h-[400px] md:h-[480px] lg:h-[540px] xl:h-[580px]">
              <HeroCrystalScene />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 morph-btn-outline text-xs tracking-wide min-h-[44px] px-6"
        aria-label="Scroll to about section"
      >
        Scroll to explore
        <FiArrowDown size={14} />
      </button>
    </section>
  );
}
