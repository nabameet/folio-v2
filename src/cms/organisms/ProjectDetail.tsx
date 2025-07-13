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
      <article className="max-w-full lg:prose-p:max-w-xl lg:prose-headings:max-w-xl lg:prose-h1:max-w-full w-full text-justify prose lg:prose-xl text-foreground prose-headings:text-foreground prose-headings:font-normal prose-headings:tracking-tighter prose-p:leading-snug">
        {renderHeader ? (
          renderHeader(project)
        ) : (
          <h1 className="text-7xl lg:text-9xl lg:leading-23 lg:mb-0 leading-12 mb-0">
            {project.metadata.title}
          </h1>
        )}
        {renderMeta ? (
          renderMeta(project)
        ) : (
          <div>
            {/* {formatDate(project.metadata.publishedAt)} */}
            {project.metadata.tags.split(",").map((tag, key) => (
              <span
                key={key}
                className="pl-12 lg:pl-20 lg:pr-8 pr-4 -mr-2 lg:-mr-4 text-xl lg:text-3xl border rounded-[100%]"
              >
                {tag.trim()}
              </span>
            ))}
            <p>{project.metadata.summary}</p>
          </div>
        )}
        <MDXContentRenderer source={project.content} />
      </article>
    </section>
  );
};
