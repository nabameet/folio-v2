"use client";

import { useMemo, useState } from "react";
import { Project } from "@/types/project";
import { useProjectHover } from "@/hooks/useProjectHover";

import { Footer } from "@/components/footer";
import { ProjectSnapshot } from "@/components/project-snapshot";
import { ProjectList } from "@/cms/organisms/ProjectList";
import { ProjectGrid } from "@/cms/organisms/ProjectGrid";

interface HomeProps {
  /** Array of projects from CMS */
  projects: Project[];
}

type ProjectsView = "grid" | "list";

const ViewGridIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
    />
  </svg>

);

const ViewListIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>

);

/**
 * Home page component with project showcase
 *
 * Displays logo, project list, and interactive project preview on hover
 * Uses view transitions for smooth navigation between project pages
 *
 * @param projects - Array of project data from CMS
 */
export default function Home({ projects }: HomeProps) {
  const [projectsView, setProjectsView] = useState<ProjectsView>("grid");
  const {
    currentProject,
    showImage,
    handleProjectHover,
    handleProjectHoverEnd,
  } = useProjectHover();

  const currentImage = useMemo(
    () => ({
      src: currentProject?.metadata.image || "",
      alt: currentProject?.metadata.title || "",
      tags: currentProject?.metadata.tags || "",
      slug: currentProject?.slug || "placeholder",
    }),
    [currentProject],
  );

  return (
    <main className="relative flex min-h-dvh w-full flex-col">
      {projectsView === "list" ? (
        <ProjectSnapshot showImage={showImage} currentImage={currentImage} />
      ) : null}

      <div className="relative z-40 w-full flex-1 px-8 pt-40 md:px-12">
        <div className="flex items-center justify-between gap-6 lowercase">
          <h1 className="">selected works:</h1>

          {/* <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={projectsView === "grid"}
              onClick={() => setProjectsView("grid")}
              className={`rounded-full border p-2 transition-opacity ${
                projectsView === "grid" ? "opacity-100" : "opacity-60"
              }`}
            >
              <ViewGridIcon className="size-4" />
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={projectsView === "list"}
              onClick={() => setProjectsView("list")}
              className={`rounded-full border p-2 transition-opacity ${
                projectsView === "list" ? "opacity-100" : "opacity-60"
              }`}
            >
              <ViewListIcon className="size-4" />
            </button>
          </div> */}
        </div>

        <div className="mt-4">
          {projectsView === "grid" ? (
            <ProjectGrid projects={projects} />
          ) : (
            <ProjectList
              heading={null}
              projects={projects}
              onProjectHover={handleProjectHover}
              onProjectHoverEnd={handleProjectHoverEnd}
            />
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
