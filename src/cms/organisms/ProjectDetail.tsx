import React from 'react';
import { formatDate } from '../utils/date';
import { MDXContentRenderer } from './MDXContentRenderer';
import { MDXContent } from '../types';

export type ProjectDetailProps = {
  project: MDXContent;
  renderHeader?: (project: MDXContent) => React.ReactNode;
  renderMeta?: (project: MDXContent) => React.ReactNode;
  className?: string;
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, renderHeader, renderMeta, className }) => {
  if (!project) return <div>Project not found.</div>;

  return (
    <section className={className}>
      {renderHeader ? (
        renderHeader(project)
      ) : (
        <h1>{project.metadata.title}</h1>
      )}
      {renderMeta ? (
        renderMeta(project)
      ) : (
        <div style={{ margin: '0.5rem 0', color: '#888' }}>{formatDate(project.metadata.publishedAt)}</div>
      )}
      <MDXContentRenderer source={project.content} />
    </section>
  );
}; 