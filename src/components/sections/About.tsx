"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { aboutContent } from "@/content/about";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const navPanels = [
  { label: "About", title: "About Me", href: "#about" },
  { label: "Work", title: "Experience", href: "#experience" },
  { label: "Projects", title: "Portfolio", href: "#projects" },
  { label: "Contact", title: "Get in Touch", href: "#contact" },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".about-role",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    gsap.fromTo(
      ".about-tech",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".about-tech-grid",
          start: "top 80%",
        },
      }
    );
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="about" className="section-padding relative section-divider morph-section-alt">
      <div className="container-main">
        <SectionHeading
          label="About"
          title={aboutContent.title}
          subtitle={aboutContent.intro}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-16">
          {navPanels.map((panel) => (
            <button
              key={panel.label}
              type="button"
              onClick={() => scrollTo(panel.href)}
              className="morph-flip-panel h-[160px] md:h-[200px] bg-surface-raised border border-glass-border group cursor-pointer"
            >
              <div className="front">
                <h4 className="text-xs font-light text-white/50">{panel.label}</h4>
                <h2 className="text-xl md:text-2xl font-light mt-1">{panel.title}</h2>
              </div>
              <div className="back">
                <h4 className="text-xs font-light text-white/50">{panel.label}</h4>
                <h2 className="text-lg md:text-xl font-normal mt-1">Explore →</h2>
              </div>
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16">
          {aboutContent.roles.map((role, i) => (
            <GlassCard key={role} className="about-role opacity-0 !p-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-light text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-light">{role}</span>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="surface-card p-6 md:p-8">
          <h3 className="text-lg font-display font-light mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-white/30" />
            Technologies & Tools
          </h3>
          <div className="about-tech-grid flex flex-wrap gap-2.5">
            {aboutContent.technologies.map((tech) => (
              <span
                key={tech}
                className="about-tech opacity-0 px-4 py-2 bg-surface-raised border border-glass-border text-sm text-muted hover:text-foreground hover:border-white/25 transition-all duration-500 cursor-default font-light"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
