import type { NavLink } from "@/types";

export const navigationContent = {
  logo: "MSK",
  links: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "#skills" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavLink[],
};
