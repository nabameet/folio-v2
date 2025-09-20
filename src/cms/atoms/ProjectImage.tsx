import Image, { ImageProps } from "next/image";
import React from "react";
import { getProjectImageTransitionName } from "../utils/viewTransitions";

export type ProjectImageProps = ImageProps & {
  slug?: string; // pass slug down from ProjectDetail
};

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  // slug,
  ...props
}) => {
  // Use slug-based key if available
  const transitionKey = getProjectImageTransitionName(src);

  return (
    <div
      style={{ viewTransitionName: transitionKey }}
      className="h-auto w-full"
    >
      <link rel="preload" as="image" href={src as string} />
      <Image
        src={src}
        alt={alt}
        {...props}
        width={1920}
        height={1080}
        className="h-auto w-full object-contain"
      />
    </div>
  );
};
