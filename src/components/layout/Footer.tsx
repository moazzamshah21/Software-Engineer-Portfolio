import { contactContent } from "@/content/contact";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative section-padding pb-10 pt-16 bg-surface-overlay">
      <div className="container-main">
        <div className="h-px bg-white/10 mb-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display font-light text-lg mb-1">
              Moazzam Shah Khan
            </p>
            <p className="text-sm text-muted font-light">
              © {year} All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-8">
            {contactContent.social.slice(0, 2).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted morph-link hover:text-foreground transition-colors font-light"
                data-cursor="pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
