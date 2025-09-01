import React from "react";
import { MDXContent } from "../types";
import { cmsConfig } from "../config/content";
import Link from "next/link";
import clsx from "clsx";

export type ProjectListProps = {
  projects: MDXContent[];
  renderItem?: (project: MDXContent) => React.ReactNode;
  className?: string;
  onProjectHover?: (project: MDXContent) => void;
  onProjectHoverEnd?: () => void;
};

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  renderItem,
  className,
  onProjectHover, 
  onProjectHoverEnd
}) => {

  const sortedProjects = projects.sort((a, b) => 
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <div className={clsx("flex flex-col gap-4 lowercase", className)}>
      <h1 className="">selected works:</h1>
      <ul className="">
        {sortedProjects.map((project, index) =>
          renderItem ? (
            renderItem(project)
          ) : (
            <li key={index} className="" onMouseEnter={() => onProjectHover?.(project)} onMouseLeave={() => onProjectHoverEnd?.()}>
              <Link className="flex gap-2" href={cmsConfig.base_path + "/" + project.slug}>
                <span className="pl-8 pr-2 text-sm border rounded-[100%]">
                  {index + 1}
                </span>
                <span className="flex gap-1">
                  <span className="italic underline">
                    {project.metadata.title}
                  </span>
                  {/* <span className="text-xs">[ {project.metadata.tags} ]</span> */}
                </span>
                {/* <p>{project.metadata.summary}</p> */}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
