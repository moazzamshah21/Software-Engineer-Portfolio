"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { experienceContent } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { use3DCardTilt } from "@/hooks";
import type { ExperienceItem } from "@/types";
import { FiBriefcase, FiCalendar } from "react-icons/fi";

function ExperienceBlock({ item, index }: { item: ExperienceItem; index: number }) {
  const blockRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { ref: tiltRef, handleMouseMove, handleMouseLeave } = use3DCardTilt({
    maxRotate: 4,
    perspective: 1400,
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      handleMouseMove(e);
      const glow = glowRef.current;
      if (!glow) return;
      const rect = e.currentTarget.getBoundingClientRect();
      glow.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      glow.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    },
    [handleMouseMove]
  );

  useEffect(() => {
    registerGsapPlugins();
    const block = blockRef.current;
    if (!block) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        block,
        { opacity: 0, y: 60, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        block.querySelectorAll(".experience-achievement"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, block);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={blockRef} className="experience-block relative">
      <div
        ref={tiltRef}
        onMouseMove={onMouseMove}
        onMouseLeave={handleMouseLeave}
        className="experience-card-inner experience-scene relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div ref={glowRef} className="experience-card-glow rounded-none" aria-hidden />

        <div className="relative z-10 grid lg:grid-cols-[minmax(280px,360px)_1fr] gap-0">
          <div className="p-8 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-glass-border bg-surface-raised/80">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 border border-glass-border flex items-center justify-center text-white/70 shrink-0">
                <FiBriefcase size={20} />
              </div>
              <span className="text-xs font-light text-white/40 tracking-widest uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <p className="inline-flex items-center gap-2 text-xs font-light text-white/55 px-3 py-1.5 border border-glass-border mb-6">
              <FiCalendar size={12} />
              {item.period}
            </p>

            <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-light leading-[1.1] tracking-tight">
              {item.company}
            </h3>
            <p className="text-white/65 mt-3 text-lg md:text-xl font-light">{item.role}</p>

            <div className="mt-8 pt-8 border-t border-glass-border grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl md:text-3xl font-display font-light">
                  {item.achievements.length}
                </p>
                <p className="text-xs text-white/45 mt-1 font-light">Core contributions</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-light">
                  {item.period.split("—")[0]?.trim() ?? "2022"}
                </p>
                <p className="text-xs text-white/45 mt-1 font-light">Started</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 lg:p-12">
            <p className="text-xs font-light text-white/45 tracking-widest uppercase mb-6">
              Highlights
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {item.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="experience-achievement flex items-start gap-3 text-muted text-sm leading-relaxed font-light pl-5 opacity-0"
                >
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative section-divider overflow-hidden morph-section-alt py-20 md:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container-main mb-12 md:mb-16 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <SectionHeading
          label="Experience"
          title={experienceContent.title}
          subtitle={experienceContent.subtitle}
        />
      </div>

      <div ref={trackRef} className="relative w-full">
        <div className="absolute top-0 left-5 sm:left-8 md:left-12 lg:left-16 xl:left-20 right-5 sm:right-8 md:right-12 lg:right-16 xl:right-20 h-px bg-white/10">
          <div
            ref={progressRef}
            className="h-full origin-left bg-gradient-to-r from-white/30 via-white to-white/30"
            style={{ boxShadow: "0 0 16px rgba(255,255,255,0.25)" }}
          />
        </div>

        <div className="experience-full-bleed mt-px">
          {experienceContent.items.map((item, index) => (
            <ExperienceBlock key={item.company} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
