"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { navigationContent } from "@/content/navigation";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { cn } from "@/lib/utils";
import { FiMenu, FiX } from "react-icons/fi";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Navbar() {
  const pathname = usePathname();
  const scrollToSection = useScrollToSection();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 3, ease: "power3.out" }
    );
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-3 bg-background/90 backdrop-blur-xl border-b border-glass-border"
          : "py-5 md:py-6 bg-transparent"
      )}
    >
      <nav className="container-main flex items-center justify-between gap-4 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <Link
          href="/"
          className="nav-item text-xl font-display font-light tracking-tight text-foreground"
          data-cursor="pointer"
        >
          {navigationContent.logo}
        </Link>

        <ul className="hidden lg:flex items-center gap-12">
          {navigationContent.links.map((link) => (
            <li key={link.href} className="nav-item">
              {link.href.startsWith("#") ? (
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-light text-foreground morph-link"
                  data-cursor="pointer"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-light morph-link",
                    pathname === link.href ? "text-foreground" : "text-foreground/80"
                  )}
                  data-cursor="pointer"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:block nav-item">
          <MagneticButton
            variant="primary"
            size="sm"
            onClick={() => handleNavClick("#contact")}
          >
            Contact
          </MagneticButton>
        </div>

        <button
          className="lg:hidden nav-item flex items-center justify-center w-10 h-10 border border-glass-border hover:bg-white/5 transition-colors shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          data-cursor="pointer"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden mx-4 mt-2 bg-surface-overlay border border-glass-border overflow-hidden">
          <ul className="px-4 py-4">
            {navigationContent.links.map((link) => (
              <li key={link.href} className="border-b border-white/10">
                {link.href.startsWith("#") ? (
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left py-4 text-sm font-light text-foreground/90 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-sm font-light text-foreground/90 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="pt-4">
              <MagneticButton
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => handleNavClick("#contact")}
              >
                Contact
              </MagneticButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
