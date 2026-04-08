import React, { useMemo } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import clsx from "clsx";
import { cmsConfig } from "@/cms/config/content";
import { LAYOUT_CONSTANTS } from "@/constants/layout";
import { Project } from "@/types/project";

export interface ProjectGridProps {
  /** Array of projects to display */
  projects: Project[];
  /** Additional CSS classes */
  className?: string;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  className,
}) => {
  const sortedProjects = useMemo(
    () =>
      projects.toSorted(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime(),
      ),
    [projects],
  );

  return (
    <div
      className={clsx(
        "grid w-full grid-cols-1 gap-12  lowercase sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {sortedProjects.map((project) => {
        const href = cmsConfig.base_path + "/" + project.slug;
        const tags = project.metadata.tags
          ? project.metadata.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [];

        const visibleTags = tags.slice(0, 3);
        const hiddenCount = Math.max(0, tags.length - visibleTags.length);
        const tagText =
          visibleTags.length > 0
            ? visibleTags.join(", ") + (hiddenCount > 0 ? `, +${hiddenCount}` : "")
            : "";

        return (
          <Link
            key={project.slug}
            href={href}
            className="group flex flex-col gap-3"
          >
            <div className="relative aspect-[2/1] overflow-hidden bg-[#e3dbd1] dark:bg-[#2c2e33]">
              <Image
                src={project.metadata.image || LAYOUT_CONSTANTS.IMAGE_PLACEHOLDER}
                alt={project.metadata.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-300 transition-timing-function:cubic-bezier(0.16,1,0.3,1) group-hover:scale-[1.02]"
              />
            </div>

            <div className="flex justify-between gap-4">
              <span className="min-w-0 flex-1 italic underline underline-offset-2">
                {project.metadata.title}
              </span>
(
              {tagText ? (
                <span className="text-right leading-snug text-black/70 text-foreground">
                  {tagText}
                </span>
              ) : null})
            </div>
          </Link>
        );
      })}
    </div>
  );
};

