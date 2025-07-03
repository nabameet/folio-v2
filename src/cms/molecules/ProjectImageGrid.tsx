import React from 'react';

export type ProjectImageGridProps = {
  children: React.ReactNode;
};

export const ProjectImageGrid: React.FC<ProjectImageGridProps> = ({ children }) => (
  <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
    {children}
  </div>
); 