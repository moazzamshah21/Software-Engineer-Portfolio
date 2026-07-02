"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { projectsContent } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FiArrowRight } from "react-icons/fi";

const featuredIds = [
  "yalla-go-express-flutter",
  "multi-role-delivery",
  "delivery-dashboard",
  "admin-dashboards",
];

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  const featured = projectsContent.items.filter((p) =>
    featuredIds.includes(p.id)
  );

  useEffect(() => {
    registerGsapPlugins();
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".featured-card",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section-padding relative section-divider morph-section-alt">
      <div className="container-main">
        <SectionHeading
          label="Projects"
          title="Featured Projects"
          subtitle="A glimpse of production work across platforms"
        />

        <div className="morph-expand-track mb-12">
          {featured.map((project) => (
            <Link
              key={project.id}
              href="/projects"
              className="featured-card opacity-0 max-md:opacity-100 morph-card-expand group p-5 md:p-8"
            >
              <div
                className="morph-card-bg absolute inset-0 pointer-events-none z-[1]"
                style={{
                  background: `radial-gradient(circle, rgba(33,33,36,0.44) 0%, #121212 100%), linear-gradient(135deg, ${project.accentColor}22, transparent)`,
                }}
              />

              <div className="morph-card-content">
                <div className="morph-card-content-inner">
                  <div className="morph-card-content-top">
                    <h4 className="text-xs font-light text-white/50">{project.techStack[0]}</h4>
                    <h2 className="morph-card-heading">{project.title}</h2>
                  </div>

                  <div className="morph-card-content-reveal">
                    <p className="morph-card-reveal-text morph-card-reveal-text--3">
                      {project.description}
                    </p>
                    <div className="morph-card-reveal-tags">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-light text-white/60 px-2 py-0.5 border border-white/15"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="morph-card-spacer" aria-hidden />
                </div>

                <button
                  type="button"
                  className="morph-toggle-btn"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <span className="icon" />
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <MagneticButton href="/projects" variant="primary" size="lg">
            View All Projects
            <FiArrowRight size={18} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
