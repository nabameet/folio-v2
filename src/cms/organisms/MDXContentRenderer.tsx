import React from "react";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { ProjectImage } from "../atoms/ProjectImage";
import { ProjectImageGrid } from "../molecules/ProjectImageGrid";

const defaultComponents = {
  img: ProjectImage,
  ProjectImage,
  ProjectImageGrid,
};

export type MDXContentRendererProps = Omit<MDXRemoteProps, "components"> & {
  components?: MDXRemoteProps["components"];
};

export const MDXContentRenderer: React.FC<MDXContentRendererProps> = ({
  components,
  ...props
}) => (
  <MDXRemote {...props} components={{ ...defaultComponents, ...components }} />
);
