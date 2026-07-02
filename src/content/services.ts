import type { Service } from "@/types";

export const servicesContent = {
  title: "What I Build",
  subtitle: "End-to-end digital solutions",
  items: [
    {
      title: "Mobile Apps",
      description:
        "Native-quality iOS and Android applications with polished UX and robust architecture.",
      icon: "mobile",
    },
    {
      title: "Cross Platform Apps",
      description:
        "Single codebase solutions using Flutter and React Native for faster time-to-market.",
      icon: "layers",
    },
    {
      title: "React Websites",
      description:
        "Modern, performant web applications with stunning animations and SEO optimization.",
      icon: "globe",
    },
    {
      title: "Admin Dashboards",
      description:
        "Data-rich admin panels with real-time analytics, charts, and intuitive management tools.",
      icon: "dashboard",
    },
    {
      title: "Backend APIs",
      description:
        "Scalable REST APIs and server-side logic with Node.js, Firebase, and Supabase.",
      icon: "server",
    },
    {
      title: "Firebase Solutions",
      description:
        "Complete Firebase implementations including auth, database, storage, and cloud functions.",
      icon: "firebase",
    },
    {
      title: "Real Time Systems",
      description:
        "Live tracking, chat, notifications, and real-time data synchronization at scale.",
      icon: "realtime",
    },
    {
      title: "UI Development",
      description:
        "Pixel-perfect interfaces with micro-interactions, animations, and accessibility in mind.",
      icon: "design",
    },
  ] satisfies Service[],
};
