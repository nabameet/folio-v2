import React from "react";

export type ProjectImageGridProps = {
  children: React.ReactNode;
};

export const ProjectImageGrid: React.FC<ProjectImageGridProps> = ({
  children,
}) => <div className="flex">{children}</div>;
