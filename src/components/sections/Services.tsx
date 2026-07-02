"use client";

import { useEffect, useRef } from "react";
import {
  FiSmartphone,
  FiLayers,
  FiGlobe,
  FiGrid,
  FiServer,
  FiZap,
  FiActivity,
  FiPenTool,
} from "react-icons/fi";
import { SiFirebase } from "react-icons/si";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { servicesContent } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ReactNode> = {
  mobile: <FiSmartphone size={20} />,
  layers: <FiLayers size={20} />,
  globe: <FiGlobe size={20} />,
  dashboard: <FiGrid size={20} />,
  server: <FiServer size={20} />,
  firebase: <SiFirebase size={20} />,
  realtime: <FiActivity size={20} />,
  design: <FiPenTool size={20} />,
};

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".service-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section-padding relative section-divider morph-section-alt">
      <div className="container-main">
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          <div>
            <h4 className="morph-heading-label">Services</h4>
            <h2 className="morph-heading-title text-2xl md:text-3xl mt-2">{servicesContent.title}</h2>
          </div>
          <div className="md:text-right">
            <p className="text-sm font-light text-white/80 leading-8">{servicesContent.subtitle}</p>
          </div>
          <div className="md:text-right hidden md:block">
            <p className="text-sm font-light text-white/50 leading-8">
              End-to-end digital solutions tailored to your product goals.
            </p>
          </div>
        </div>

        <div className="morph-expand-track">
          {servicesContent.items.slice(0, 4).map((service, i) => (
            <div
              key={service.title}
              className="service-card opacity-0 morph-card-expand morph-card-expand--tall group p-6 md:p-8"
            >
              <div className="morph-card-content">
                <div className="morph-card-content-inner">
                  <div className="morph-card-content-top">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 border border-glass-border flex items-center justify-center text-white/70 group-hover:text-white transition-colors duration-500">
                        {iconMap[service.icon] || <FiZap size={20} />}
                      </div>
                      <span className="text-xs font-light text-white/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="text-xs font-light text-white/50">Service</h4>
                    <h3 className="morph-card-heading">{service.title}</h3>
                  </div>

                  <div className="morph-card-content-reveal">
                    <p className="morph-card-reveal-text morph-card-reveal-text--4">
                      {service.description}
                    </p>
                  </div>

                  <div className="morph-card-spacer" aria-hidden />
                </div>

                <button type="button" className="morph-toggle-btn" aria-hidden="true" tabIndex={-1}>
                  <span className="icon" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {servicesContent.items.slice(4).map((service, i) => (
            <div
              key={service.title}
              className="service-card opacity-0 surface-card p-5 group hover:border-white/20 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-3 text-white/60 group-hover:text-white transition-colors">
                {iconMap[service.icon] || <FiZap size={18} />}
                <span className="text-xs font-light text-white/40">
                  {String(i + 5).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-light mb-2">{service.title}</h3>
              <p className="text-sm text-muted font-light leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
