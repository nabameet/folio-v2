import Image from "next/image";

export default function ProjectSnapshot({
  showImage,
  currentImage,
}: {
  showImage: boolean;
  currentImage: { src: string; alt: string; tags: string };
}) {
  return (
    <div className="invisible fixed right-0 z-50 flex h-full w-auto flex-col items-end justify-center px-8 py-18 sm:visible md:px-12 md:py-36 xl:max-w-1/2">
      <Image
        className={`w-full bg-[#e3dbd1] object-cover dark:bg-[#2c2e33] ${
          showImage ? "visible" : "invisible"
        }`}
        src={currentImage.src}
        alt={currentImage.alt}
        width={1400}
        height={1080}
        loading="eager"
        priority
      />
      <div>
        {currentImage.tags.split(",").map((tag, key) => (
          <span
            key={key}
            className="border-1.5 border-foreground rounded-[100%] border pr-4 pl-12 text-xl lg:pr-8 lg:pl-20 lg:text-3xl"
          >
            {tag.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}
