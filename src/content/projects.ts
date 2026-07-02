import type { Project, ProjectCategory } from "@/types";

export const projectsContent = {
  title: "Selected Work",
  subtitle: "Production applications across mobile and web",
  categories: [
    { id: "websites" as ProjectCategory, label: "Websites" },
    { id: "react-native" as ProjectCategory, label: "React Native" },
    { id: "flutter" as ProjectCategory, label: "Flutter" },
  ],
  items: [
    // Flutter Projects
    {
      id: "yalla-go-express-flutter",
      title: "Yalla Go Express",
      description:
        "Full-featured delivery platform with real-time order tracking, driver management, and seamless payment integration.",
      category: "flutter",
      techStack: ["Flutter", "Firebase", "Google Maps", "Stripe"],
      gradient: "from-white/10 to-white/5",
      accentColor: "#E8E8EC",
    },
    {
      id: "zelor-wines",
      title: "Zelor Wines",
      description:
        "Premium wine e-commerce application with curated collections, secure checkout, and elegant product discovery.",
      category: "flutter",
      techStack: ["Flutter", "Firebase", "Stripe", "REST APIs"],
      gradient: "from-white/12 to-white/4",
      accentColor: "#C8C8D0",
    },
    {
      id: "remember-me",
      title: "Remember Me",
      description:
        "Memory preservation app helping users capture, organize, and relive meaningful moments with rich media support.",
      category: "flutter",
      techStack: ["Flutter", "Firebase", "Cloud Storage"],
      gradient: "from-white/8 to-white/3",
      accentColor: "#A8A8B0",
    },
    {
      id: "e-clips",
      title: "E.Clips",
      description:
        "Digital clipping and content management platform with intuitive media organization and sharing capabilities.",
      category: "flutter",
      techStack: ["Flutter", "Firebase", "MVVM"],
      gradient: "from-white/10 to-white/6",
      accentColor: "#D0D0D8",
    },
    {
      id: "tylers-list",
      title: "Tyler's List",
      description:
        "Task and list management application with collaborative features and real-time synchronization.",
      category: "flutter",
      techStack: ["Flutter", "Firebase", "Clean Architecture"],
      gradient: "from-white/11 to-white/5",
      accentColor: "#B8B8C0",
    },
    {
      id: "service-it",
      title: "Service It",
      description:
        "On-demand service booking platform connecting users with verified service providers in their area.",
      category: "flutter",
      techStack: ["Flutter", "Google Maps", "Firebase", "Stripe"],
      gradient: "from-white/9 to-white/4",
      accentColor: "#BEBEC6",
    },
    {
      id: "anchor-prayer",
      title: "Anchor Prayer",
      description:
        "Spiritual wellness application with prayer tracking, reminders, and community engagement features.",
      category: "react-native",
      techStack: ["React Native", "Firebase", "Push Notifications"],
      gradient: "from-white/10 to-white/5",
      accentColor: "#E8E8EC",
    },
    {
      id: "placement-app",
      title: "Placement App",
      description:
        "Career placement platform streamlining job applications, interview scheduling, and candidate tracking.",
      category: "flutter",
      techStack: ["Flutter", "REST APIs", "Clean Architecture"],
      gradient: "from-white/12 to-white/4",
      accentColor: "#C8C8D0",
    },
    {
      id: "discreet-check",
      title: "Discreet Check",
      description:
        "Secure verification platform with privacy-first design and encrypted data handling.",
      category: "flutter",
      techStack: ["Flutter", "Firebase", "MVVM"],
      gradient: "from-white/8 to-white/3",
      accentColor: "#A8A8B0",
    },
    {
      id: "flutter-audio-cropper",
      title: "Flutter Audio Cropper",
      description:
        "Precision audio editing tool with waveform visualization and seamless export capabilities.",
      category: "flutter",
      techStack: ["Flutter", "Audio Processing", "Custom UI"],
      gradient: "from-white/10 to-white/6",
      accentColor: "#D0D0D8",
    },
    {
      id: "modular-app-architecture",
      title: "Modular App Architecture",
      description:
        "Scalable Flutter architecture template demonstrating clean separation of concerns with feature modules.",
      category: "flutter",
      techStack: ["Flutter", "Clean Architecture", "MVVM", "Dependency Injection"],
      githubUrl: "https://github.com/moazzamshah21",
      gradient: "from-white/11 to-white/5",
      accentColor: "#B8B8C0",
    },
    // React Native Projects
    {
      id: "multi-role-delivery",
      title: "Multi Role Delivery Platform",
      description:
        "Enterprise delivery ecosystem with separate interfaces for customers, drivers, vendors, and administrators.",
      category: "react-native",
      techStack: ["React Native", "Firebase", "Google Maps", "Stripe"],
      gradient: "from-white/10 to-white/5",
      accentColor: "#E8E8EC",
    },
    {
      id: "yalla-go-express-rn",
      title: "Yalla Go Express",
      description:
        "React Native implementation of the delivery platform with native performance and cross-platform consistency.",
      category: "flutter",
      techStack: ["Flutter", "Firebase", "Real-time Tracking"],
      gradient: "from-white/8 to-white/3",
      accentColor: "#A8A8B0",
    },
    {
      id: "production-rn-apps",
      title: "Production React Native Apps",
      description:
        "Multiple production React Native applications deployed to App Store and Google Play with active user bases.",
      category: "react-native",
      techStack: ["React Native", "TypeScript", "Firebase", "REST APIs"],
      gradient: "from-white/12 to-white/4",
      accentColor: "#C8C8D0",
    },
    // Website Projects
    {
      id: "admin-dashboards",
      title: "Admin Dashboards",
      description:
        "Comprehensive admin panels with real-time analytics, user management, and role-based access control.",
      category: "websites",
      techStack: ["React", "Next.js", "TypeScript", "Firebase"],
      gradient: "from-white/10 to-white/6",
      accentColor: "#D0D0D8",
    },
    {
      id: "vendor-panels",
      title: "Vendor Panels",
      description:
        "Vendor management portals with order processing, inventory tracking, and performance metrics.",
      category: "websites",
      techStack: ["React", "Node.js", "REST APIs", "Stripe"],
      gradient: "from-white/11 to-white/5",
      accentColor: "#B8B8C0",
    },
    {
      id: "delivery-dashboard",
      title: "Real-time Delivery Dashboard",
      description:
        "Live operations dashboard with map visualization, driver tracking, and order management in real-time.",
      category: "websites",
      techStack: ["React", "Google Maps", "WebSockets", "Firebase"],
      gradient: "from-white/9 to-white/4",
      accentColor: "#BEBEC6",
    },
    {
      id: "react-websites",
      title: "Modern React Websites",
      description:
        "Production React websites with optimized performance, SEO, and responsive design for diverse clients.",
      category: "websites",
      techStack: ["React", "Next.js", "TailwindCSS", "TypeScript"],
      gradient: "from-white/10 to-white/5",
      accentColor: "#E8E8EC",
    },
    {
      id: "web-systems",
      title: "Enterprise Web Systems",
      description:
        "Full-stack web applications with authentication, payment processing, and scalable backend architecture.",
      category: "websites",
      techStack: ["Next.js", "Node.js", "Supabase", "Stripe"],
      gradient: "from-white/12 to-white/4",
      accentColor: "#C8C8D0",
    },
  ] satisfies Project[],
};
