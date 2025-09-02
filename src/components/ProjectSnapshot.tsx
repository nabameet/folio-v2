import Image from "next/image";

export default function ProjectSnapshot({
  showImage,
  currentImage,
}: {
  showImage: boolean;
  currentImage: { src: string; alt: string; tags: string };
}) {
  return (
    <div className="flex flex-col items-end justify-center fixed right-0 py-18 px-8 md:py-36 md:px-12 h-full max-w-1/2 w-auto z-50">
      <Image
        className={`object-cover dark:bg-[#2c2e33] bg-[#e3dbd1] w-full ${
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
            className="pl-12 lg:pl-20 lg:pr-8 pr-4 text-xl lg:text-3xl border border-1.5 border-foreground rounded-[100%]"
          >
            {tag.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}
