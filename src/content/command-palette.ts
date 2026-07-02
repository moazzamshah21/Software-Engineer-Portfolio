import type { CommandItem } from "@/types";

export const commandPaletteContent: CommandItem[] = [
  { id: "home", label: "Go to Home", action: "/", group: "Navigation" },
  { id: "about", label: "Go to About", action: "#about", group: "Navigation" },
  { id: "experience", label: "Go to Experience", action: "#experience", group: "Navigation" },
  { id: "projects", label: "View Projects", action: "/projects", group: "Navigation" },
  { id: "skills", label: "Go to Skills", action: "#skills", group: "Navigation" },
  { id: "services", label: "Go to Services", action: "#services", group: "Navigation" },
  { id: "contact", label: "Contact Me", action: "#contact", group: "Navigation" },
  { id: "linkedin", label: "Open LinkedIn", action: "https://www.linkedin.com/in/moazzamshahk/", group: "Social" },
  { id: "github", label: "Open GitHub", action: "https://github.com/moazzamshah21", group: "Social" },
  { id: "email", label: "Send Email", action: "mailto:moazzamshahkhan08@gmail.com", group: "Social" },
];
