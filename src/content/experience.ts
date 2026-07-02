import type { ExperienceItem } from "@/types";

export const experienceContent = {
  title: "Experience",
  subtitle: "Building production systems that scale",
  items: [
    {
      company: "Mattrics Pvt Ltd",
      role: "Software Engineer",
      period: "2022 — Present",
      achievements: [
        "Shipped production applications serving thousands of active users across iOS and Android",
        "Led cross-platform development using Flutter and React Native for delivery platforms",
        "Architected real-time live tracking systems with Google Maps integration",
        "Integrated Stripe payment flows and secure transaction handling",
        "Built Firebase-powered backends with push notifications and real-time sync",
        "Developed REST API integrations and backend services with Node.js",
        "Optimized app performance achieving smooth 60fps animations and reduced load times",
      ],
    },
  ] satisfies ExperienceItem[],
};
