import Image from "next/image";

export default function ProjectSnapshot({
  showImage,
  currentImage,
}: {
  showImage: boolean;
  currentImage: { src: string; alt: string; tags: string };
}) {
  return (
    <div className="absolute right-0 z-50 flex h-full flex-col items-end justify-end px-8 py-20 md:justify-center md:px-12 md:py-40">
      {/* <div className="h-80 w-160"> */}
      <Image
        className={`bg-[#e3dbd1] dark:bg-[#2c2e33] ${showImage ? "visible" : "invisible"}`}
        src={currentImage.src}
        alt={currentImage.alt}
        width={640}
        height={320}
        loading="eager"
        priority
      />
      {/* </div> */}
      <br />
      <div className="">
        {currentImage.tags.split(",").map((tag, key) => (
          <span
            key={key}
            className="border-1.5 border-foreground -ml-2 rounded-[100%] border pr-4 pl-12 text-xl lg:-ml-4 lg:pr-8 lg:pl-20 lg:text-3xl"
          >
            {tag.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}
