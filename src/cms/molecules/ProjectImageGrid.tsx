import React from "react";

export type ProjectImageGridProps = {
  children: React.ReactNode;
};

export const ProjectImageGrid: React.FC<ProjectImageGridProps> = ({
  children,
}) => <div className="flex w-full gap-2 overflow-hidden">{children}</div>; // temporarily removed it until i fix it
