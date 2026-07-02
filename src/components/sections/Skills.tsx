"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  FiGlobe,
  FiLayers,
  FiLayout,
  FiZap,
} from "react-icons/fi";
import {
  SiCursor,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGooglemaps,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiStripe,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { skillsContent } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RadialProgress } from "@/components/ui/RadialProgress";

const skillIconMap: Record<string, ReactNode> = {
  flutter: <SiFlutter size={24} />,
  "react-native": <SiReact size={24} />,
  react: <SiReact size={24} />,
  nextjs: <SiNextdotjs size={24} />,
  typescript: <SiTypescript size={24} />,
  javascript: <SiJavascript size={24} />,
  nodejs: <SiNodedotjs size={24} />,
  firebase: <SiFirebase size={24} />,
  supabase: <SiSupabase size={24} />,
  "google-maps": <SiGooglemaps size={24} />,
  stripe: <SiStripe size={24} />,
  "rest-apis": <FiGlobe size={22} />,
  "clean-architecture": <FiLayers size={22} />,
  mvvm: <FiLayout size={22} />,
  git: <SiGit size={24} />,
  "cursor-ai": <SiCursor size={24} />,
};

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".skill-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-padding relative section-divider">
      <div className="container-main">
        <SectionHeading
          label="Skills"
          title={skillsContent.title}
          subtitle={skillsContent.subtitle}
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
          {skillsContent.items.map((skill) => (
            <div
              key={skill.name}
              className="skill-card opacity-0 surface-card p-5 md:p-6 flex flex-col items-center gap-1 hover:border-white/20 transition-all duration-500 group"
            >
              <RadialProgress
                percentage={skill.percentage}
                label={skill.name}
                icon={skillIconMap[skill.icon] ?? <FiZap size={22} />}
                size={90}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
