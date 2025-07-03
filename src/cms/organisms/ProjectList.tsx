import React from "react";
import { MDXContent } from "../types";
import { cmsConfig } from "../config/content";
import Link from "next/link";

export type ProjectListProps = {
  projects: MDXContent[];
  renderItem?: (project: MDXContent) => React.ReactNode;
  className?: string;
};

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  renderItem,
  className,
}) => {
  return (
    <ul className={className}>
      {projects.map((project) =>
        renderItem ? (
          renderItem(project)
        ) : (
          <li key={project.slug} className="text-right">
            <Link href={cmsConfig.base_path + "/" + project.slug} className="">
              {project.metadata.title}
              {project.metadata.isPersonal ? " (personal)" : ""}
              {/* <p>{project.metadata.summary}</p> */}
            </Link>
          </li>
        )
      )}
    </ul>
  );
};
