import React from "react";
// import { formatDate } from "../utils/date";
import { MDXContentRenderer } from "./MDXContentRenderer";
import { MDXContent } from "../types";
import clsx from "clsx";

export type ProjectDetailProps = {
  project: MDXContent;
  renderHeader?: (project: MDXContent) => React.ReactNode;
  renderMeta?: (project: MDXContent) => React.ReactNode;
  className?: string;
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  renderHeader,
  renderMeta,
  className,
}) => {
  if (!project) return <div>Project not found.</div>;

  return (
    <section
      className={clsx(
        className,
        "px-8 pt-40 pb-20 w-full lowercase md:px-12 md:pt-52"
      )}
    >
      {renderHeader ? (
        renderHeader(project)
      ) : (
        <h1 className="text-7xl">{project.metadata.title}</h1>
      )}
      {renderMeta ? (
        renderMeta(project)
      ) : (
        <div className="flex flex-col gap-8 mb-12">
          {/* {formatDate(project.metadata.publishedAt)} */}
          <div className="">
            {project.metadata.tags.split(",").map((tag, key) => (
              <span
                key={key}
                className="pl-12 pr-4 -mr-2 text-sm border rounded-[100%]"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
          <p>{project.metadata.summary}</p>
        </div>
      )}
      <article className="w-full text-justify prose lg:prose-xl text-foreground prose-headings:text-foreground prose-headings:font-normal prose-headings:tracking-tighter prose-p:leading-snug">
        <MDXContentRenderer source={project.content} />
      </article>
    </section>
  );
};
