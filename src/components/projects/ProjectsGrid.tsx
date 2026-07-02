"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { projectsContent } from "@/content/projects";
import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("flutter");
  const gridRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projectsContent.items.filter(
    (p) => p.category === activeCategory
  );

  const animateGrid = useCallback(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".project-card");
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, []);

  const handleTabChange = (category: ProjectCategory, index: number) => {
    if (category === activeCategory) return;

    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (cards) {
      gsap.to(cards, {
        y: -20,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.in",
        onComplete: () => {
          setActiveCategory(category);
        },
      });
    } else {
      setActiveCategory(category);
    }

    if (indicatorRef.current && tabsRef.current) {
      const tab = tabsRef.current.children[index] as HTMLElement;
      gsap.to(indicatorRef.current, {
        x: tab.offsetLeft,
        width: tab.offsetWidth,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  useEffect(() => {
    animateGrid();
  }, [activeCategory, animateGrid]);

  useEffect(() => {
    if (indicatorRef.current && tabsRef.current) {
      const activeIndex = projectsContent.categories.findIndex(
        (c) => c.id === activeCategory
      );
      const tab = tabsRef.current.children[activeIndex] as HTMLElement;
      if (tab) {
        gsap.set(indicatorRef.current, {
          x: tab.offsetLeft,
          width: tab.offsetWidth,
        });
      }
    }
  }, [activeCategory]);

  return (
    <div>
      <div className="relative inline-flex bg-surface-raised/80 border border-glass-border p-1 mb-12 shadow-card">
        <div
          ref={indicatorRef}
          className="absolute top-1 bottom-1 bg-white/20"
        />
        <div ref={tabsRef} className="relative flex flex-wrap">
          {projectsContent.categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => handleTabChange(cat.id, index)}
              className={cn(
                "relative px-5 md:px-6 py-2.5 text-sm font-light transition-colors duration-300 z-10",
                activeCategory === cat.id
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              )}
              data-cursor="pointer"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={gridRef}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
