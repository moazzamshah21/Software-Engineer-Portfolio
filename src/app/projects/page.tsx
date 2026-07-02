import type { Metadata } from "next";
import { generateSiteMetadata } from "@/lib/seo";
import { projectsSeoContent } from "@/content/seo";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectsContent } from "@/content/projects";

export const metadata: Metadata = generateSiteMetadata(projectsSeoContent);

export default function ProjectsPage() {
  return (
    <section className="section-padding pt-28 md:pt-32 min-h-screen">
      <div className="container-main">
        <SectionHeading
          label="Portfolio"
          title={projectsContent.title}
          subtitle={projectsContent.subtitle}
        />
        <ProjectsGrid />
      </div>
    </section>
  );
}
