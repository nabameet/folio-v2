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
  // if (!project) return <h1>project not found, check url</h1> // already checked in page.tsx [slug]

  return (
    <section
      className={clsx(
        className,
        "w-full px-8 pt-40 pb-20 lowercase md:px-12 md:py-40 md:pt-52",
      )}
    >
      <article className="lg:prose-p:max-w-xl prose-a:text-foreground lg:prose-headings:max-w-xl lg:prose-h1:max-w-full prose lg:prose-xl text-foreground prose-headings:text-foreground prose-headings:font-normal prose-headings:tracking-tighter prose-p:leading-snug w-full max-w-full text-justify">
        {renderHeader ? (
          renderHeader(project)
        ) : (
          <div className="flex gap-2">
            <h1 className="mb-0 text-7xl leading-12 lg:mb-0 lg:text-9xl lg:leading-23">
              {project.metadata.title}
            </h1>
            <span className="text-sm lg:text-lg">
              [ {project.metadata.timeline} ]
            </span>
          </div>
        )}
        {renderMeta ? (
          renderMeta(project)
        ) : (
          <div>
            {/* {formatDate(project.metadata.publishedAt)} */}
            {project.metadata.tags.split(",").map((tag, key) => (
              <span
                key={key}
                className="border-1.5 -mr-2 rounded-[100%] border pr-4 pl-12 text-xl lg:-mr-4 lg:pr-8 lg:pl-20 lg:text-3xl"
              >
                {tag.trim()}
              </span>
            ))}
            <p>
              for: &nbsp;&nbsp;
              <span className="italic">{project.metadata.client}</span>
            </p>
            <p>{project.metadata.summary}</p>
          </div>
        )}
        <MDXContentRenderer source={project.content} />
      </article>
    </section>
  );
};
