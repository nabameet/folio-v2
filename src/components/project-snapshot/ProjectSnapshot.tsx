import { getProjectImageTransitionName } from "@/cms/utils/viewTransitions";
import { LAYOUT_CONSTANTS } from "@/constants/layout";
import { ProjectImageData } from "@/types/project";
import { ProjectSnapshotImage } from "./ProjectSnapshotImage";
import { ProjectSnapshotTags } from "./ProjectSnapshotTags";

interface ProjectSnapshotProps {
  /** Whether to show the image preview */
  showImage: boolean;
  /** Current project image data */
  currentImage: ProjectImageData;
}

/**
 * Project snapshot preview component
 *
 * Shows project image and tags on hover with smooth transitions
 * Positioned on the right side with view transitions support
 */
export default function ProjectSnapshot({
  showImage,
  currentImage,
}: ProjectSnapshotProps) {
  const imageSrc = currentImage?.src || LAYOUT_CONSTANTS.IMAGE_PLACEHOLDER;
  const imageAlt = currentImage?.alt || "";
  const imageTags = currentImage?.tags || "";

  const transitionKey = getProjectImageTransitionName(imageSrc);

  return (
    <div
      className={`pointer-events-none absolute right-0 z-10 flex h-full w-full max-w-2xl flex-col items-end justify-end px-8 py-20 transition-opacity duration-500 ease-in-out md:w-1/2 md:justify-center md:px-12 md:py-40 ${
        showImage && imageSrc ? "opacity-100" : "opacity-0"
      }`}
      style={{ viewTransitionName: transitionKey }}
    >
      <ProjectSnapshotImage src={imageSrc} alt={imageAlt} />

      <ProjectSnapshotTags tags={imageTags} />
    </div>
  );
}
