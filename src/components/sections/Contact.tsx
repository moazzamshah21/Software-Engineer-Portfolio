"use client";

import { useEffect, useRef } from "react";
import { FiMail, FiPhone, FiLinkedin, FiGithub } from "react-icons/fi";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { contactContent } from "@/content/contact";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";

const socialIcons = {
  linkedin: FiLinkedin,
  github: FiGithub,
  email: FiMail,
  phone: FiPhone,
};

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".contact-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative morph-section-alt">
      <div className="container-main max-w-3xl text-center relative z-10">
        <p className="morph-heading-label mb-4">Contact</p>

        <TextReveal
          as="h2"
          className="morph-heading-title text-3xl md:text-5xl lg:text-6xl tracking-tight text-balance"
        >
          {contactContent.title}
        </TextReveal>

        <p className="mt-5 text-muted text-base md:text-lg font-light">
          {contactContent.subtitle}
        </p>

        <div className="mt-12 grid sm:grid-cols-2 gap-3 md:gap-4">
          {contactContent.social.map((link) => {
            const Icon = socialIcons[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-item opacity-0 surface-card p-5 flex items-center gap-4 group hover:border-white/25 transition-all duration-500 text-left"
                data-cursor="pointer"
              >
                <div className="w-11 h-11 border border-glass-border flex items-center justify-center group-hover:bg-white/5 transition-colors shrink-0">
                  <Icon className="text-white/70" size={18} />
                </div>
                <div>
                  <p className="text-xs text-subtle uppercase tracking-wider font-light">{link.label}</p>
                  <p className="text-sm font-light mt-0.5 truncate">
                    {link.icon === "email"
                      ? contactContent.email
                      : link.icon === "phone"
                        ? contactContent.phone
                        : link.icon === "github"
                          ? link.href
                          : link.label}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-10 contact-item opacity-0 flex justify-center">
          <MagneticButton
            href={`mailto:${contactContent.email}`}
            variant="primary"
            size="lg"
          >
            Get In Touch
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
