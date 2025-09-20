"use client";

import { Project } from "@/types/project";
import { useProjectHover } from "@/hooks/useProjectHover";

import { Logomark } from "@/components/logo";
import { Footer } from "@/components/footer";
import { ProjectSnapshot } from "@/components/project-snapshot";
import { ProjectList } from "@/cms/organisms/ProjectList";

interface HomeProps {
  /** Array of projects from CMS */
  projects: Project[];
}

/**
 * Home page component with project showcase
 *
 * Displays logo, project list, and interactive project preview on hover
 * Uses view transitions for smooth navigation between project pages
 *
 * @param projects - Array of project data from CMS
 */
export default function Home({ projects }: HomeProps) {
  const {
    currentProject,
    showImage,
    handleProjectHover,
    handleProjectHoverEnd,
  } = useProjectHover();

  return (
    <main className="relative flex h-dvh max-h-dvh w-full items-center justify-center">
      <Logomark className="h-full w-full max-w-screen-2xl" />

      <ProjectSnapshot
        showImage={showImage}
        currentImage={{
          src: currentProject?.metadata.image || "",
          alt: currentProject?.metadata.title || "",
          tags: currentProject?.metadata.tags || "",
          slug: currentProject?.slug || "placeholder",
        }}
      />

      <ProjectList
        className="absolute top-0 left-0 px-8 pt-40 md:px-12"
        projects={projects}
        onProjectHover={handleProjectHover}
        onProjectHoverEnd={handleProjectHoverEnd}
      />

      <Footer />
    </main>
  );
}
