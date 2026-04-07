import React, { useMemo } from "react";
import { Link } from "next-view-transitions";
import clsx from "clsx";
import { cmsConfig } from "@/cms/config/content";
import { Project, ProjectHoverHandlers } from "@/types/project";

export interface ProjectListProps extends ProjectHoverHandlers {
  /** Array of projects to display */
  projects: Project[];
  /** Optional heading text (set to null to hide) */
  heading?: string | null;
  /** Optional custom render function for project items */
  renderItem?: (project: Project) => React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Project list component with hover functionality
 *
 * Displays sorted list of projects with hover interactions
 * Projects are sorted by publication date (newest first)
 */
export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  heading = "selected works:",
  renderItem,
  className,
  onProjectHover,
  onProjectHoverEnd,
}) => {
  /** Memoized sorted projects to prevent unnecessary re-renders */
  const sortedProjects = useMemo(
    () =>
      projects.sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime(),
      ),
    [projects],
  );

  return (
    <div className={clsx("z-40 flex flex-col gap-4 lowercase", className)}>
      {heading ? <h1 className="">{heading}</h1> : null}
      <ul className="">
        {sortedProjects.map((project, index) =>
          renderItem ? (
            renderItem(project)
          ) : (
            <li key={project.slug} className="flex gap-2">
              <span className="rounded-[100%] border pr-2 pl-8 text-sm">
                {index + 1}
              </span>
              <Link
                className="italic underline"
                href={cmsConfig.base_path + "/" + project.slug}
                onMouseEnter={() => onProjectHover?.(project)}
                onMouseLeave={() => onProjectHoverEnd?.()}
              >
                {project.metadata.title}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
