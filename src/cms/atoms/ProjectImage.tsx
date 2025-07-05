import Image, { ImageProps } from "next/image";
import React from "react";

export type ProjectImageProps = ImageProps;

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  ...props
}) => (
  // <div className="relative w-full h-">
  <Image
    src={src}
    alt={alt}
    {...props}
    width={1920}
    height={1080}
    className="object-contain w-full"
  />
  // </div>
);
