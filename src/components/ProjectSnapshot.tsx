import Image from "next/image";
import { getProjectImageTransitionName } from "../cms/utils/viewTransitions";

export default function ProjectSnapshot({
  showImage,
  currentImage,
}: {
  showImage: boolean;
  currentImage: { src: string; alt: string; tags: string; slug?: string };
}) {
  const PLACEHOLDER_IMAGE =
    "data:image/svg+xml,%3csvg width='640' height='320' xmlns='http://www.w3.org/2000/svg'%3e%3c/svg%3e";

  const imageSrc = currentImage?.src || PLACEHOLDER_IMAGE;
  const imageAlt = currentImage?.alt || "";
  const imageTags = currentImage?.tags || "";

  const transitionKey = getProjectImageTransitionName(imageSrc);

  return (
    <div
      className={`absolute right-0 z-10 flex h-full flex-col items-end justify-end px-8 py-20 transition-opacity duration-500 ease-in-out md:max-w-1/2 md:justify-center md:px-12 md:py-40 xl:max-w-2/5 ${showImage && imageSrc ? "opacity-100" : "pointer-events-none opacity-0"} `}
      style={{ viewTransitionName: transitionKey }}
    >
      <div className="w-full bg-[#e3dbd1] dark:bg-[#2c2e33]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={640}
          height={320}
          priority
          unoptimized
          className="h-auto w-full object-contain"
        />
      </div>

      {imageTags && (
        <div className="mt-6 flex flex-wrap">
          {imageTags.split(",").map((tag, idx) => (
            <span
              key={idx}
              className="border-1.5 -mr-2 rounded-[100%] border pr-4 pl-12 text-xl lg:-mr-4 lg:pr-8 lg:pl-20 lg:text-3xl"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
