import React from "react";

export type ProjectImageGridProps = {
  children: React.ReactNode;
};

export const ProjectImageGrid: React.FC<ProjectImageGridProps> = ({
  children,
}) => <div className="flex flex-col md:flex-row">{children}</div>;
