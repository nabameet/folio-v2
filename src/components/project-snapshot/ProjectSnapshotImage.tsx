import Image from "next/image";
import { LAYOUT_CONSTANTS } from "@/constants/layout";

interface ProjectSnapshotImageProps {
  /** Image source URL */
  src: string;
  /** Image alt text */
  alt: string;
  /** Image width in pixels */
  width?: number;
  /** Image height in pixels */
  height?: number;
}

/**
 * Project preview image component
 *
 * Displays project image with consistent styling and background
 * Uses Next.js Image component for optimization
 */
export const ProjectSnapshotImage: React.FC<ProjectSnapshotImageProps> = ({
  src,
  alt,
  width = LAYOUT_CONSTANTS.DEFAULT_IMAGE_WIDTH,
  height = LAYOUT_CONSTANTS.DEFAULT_IMAGE_HEIGHT,
}) => (
  <div className="w-full bg-[#e3dbd1] dark:bg-[#2c2e33]">
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
      unoptimized
      className="h-auto w-full object-contain"
    />
  </div>
);
