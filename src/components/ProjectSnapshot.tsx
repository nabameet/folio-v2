import Image from "next/image";

export default function ProjectSnapshot({
  showImage,
  currentImage,
}: {
  showImage: boolean;
  currentImage: { src: string; alt: string; tags: string };
}) {
  const PLACEHOLDER_IMAGE =
    "data:image/svg+xml,%3csvg width='640' height='320' xmlns='http://www.w3.org/2000/svg'%3e%3c/svg%3e";

  // Use placeholder image when no current image
  const imageSrc = currentImage?.src || PLACEHOLDER_IMAGE;
  const imageAlt = currentImage?.alt || "";
  const imageTags = currentImage?.tags || "";

  // Generate transition key - use consistent key for placeholder
  const transitionKey = currentImage?.src
    ? `project-image-${encodeURIComponent(currentImage.src)}`
    : "project-image-placeholder";

  console.log(transitionKey);

  return (
    <div className="absolute right-0 z-10 flex h-full flex-col items-end justify-end px-8 py-20 md:justify-center md:px-12 md:py-40">
      <Image
        className={`${transitionKey} bg-[#e3dbd1] dark:bg-[#2c2e33] ${showImage && currentImage?.src ? "visible" : "invisible"}`}
        data-view-transition={transitionKey}
        src={imageSrc}
        alt={imageAlt}
        width={640}
        height={320}
        loading="eager"
        priority
      />

      <br />

      {/* Only render tags if there are actual tags */}
      {imageTags && (
        <div className="">
          {imageTags.split(",").map((tag, key) => (
            <span
              key={key}
              className="border-1.5 border-foreground -ml-2 rounded-[100%] border pr-4 pl-12 text-xl lg:-ml-4 lg:pr-8 lg:pl-20 lg:text-3xl"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
