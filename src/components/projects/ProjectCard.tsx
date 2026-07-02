"use client";

import { useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedBorder } from "@/components/ui/AnimatedBorder";
import { FiExternalLink, FiGithub } from "react-icons/fi";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <AnimatedBorder>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="project-card group"
        style={{ transformStyle: "preserve-3d" }}
      >
        <GlassCard className="!p-0 overflow-hidden" hover glow>
          <div
            className={cn(
              "relative h-48 md:h-56 overflow-hidden bg-gradient-to-br",
              project.gradient
            )}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at 30% 50%, ${project.accentColor}40, transparent 70%)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-6xl md:text-7xl font-display font-bold opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
                style={{ color: project.accentColor }}
              >
                {project.title.charAt(0)}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
          </div>

          <div className="p-6">
            <h3 className="text-xl font-display font-light group-hover:text-white transition-all duration-500">
              {project.title}
            </h3>
            <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs border border-glass-border text-muted font-light"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground morph-link font-light"
                  data-cursor="pointer"
                >
                  <FiExternalLink size={14} />
                  Visit
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-foreground morph-link transition-colors font-light"
                  data-cursor="pointer"
                >
                  <FiGithub size={14} />
                  GitHub
                </a>
              )}
              {!project.liveUrl && !project.githubUrl && (
                <span className="text-xs text-muted/60 italic">Production App</span>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </AnimatedBorder>
  );
}
