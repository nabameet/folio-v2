import Image, { ImageProps } from "next/image";
import React from "react";

export type ProjectImageProps = ImageProps;

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  ...props
}) => (
  <Image
    src={src}
    alt={alt}
    {...props}
    width={1920}
    height={1080}
    className="h-auto w-full min-w-0 flex-1 object-contain"
  />
);
