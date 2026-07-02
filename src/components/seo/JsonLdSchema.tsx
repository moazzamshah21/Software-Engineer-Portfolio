export function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Moazzam Shah Khan",
    jobTitle: "Software Engineer",
    description:
      "Software Engineer specializing in Flutter, React Native, and Full Stack development.",
    url: "https://moazzamshahk.dev",
    sameAs: [
      "https://www.linkedin.com/in/moazzamshahk/",
      "https://github.com/moazzamshah21",
    ],
    knowsAbout: [
      "Flutter",
      "React Native",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Firebase",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Mattrics Pvt Ltd",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
