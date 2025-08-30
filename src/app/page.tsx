import Logo from "@/components/logo/Logo";
import { getAllContent } from "@/cms/utils/mdx";
import { ProjectList } from "@/cms";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  const projects = getAllContent();

  // first, currentImage = none. on mouseenter over project -> currentImage=project.image and on onmouseleave -> currentImage = none
  
  // onmouseenter -> currentImage updates, showImage = true
  // onmouseleave -> showImage = false

  const showImage = false;
  const currentImage: {src: string, alt: string} = {
    src: "/filmlandscape.jpg", alt: "smth"
  }
  
  return (
    <>
      <main className="flex relative justify-center stroke-background dark:stroke-foreground text-background mix-blend-difference dark:text-foreground items-center w-full h-screen">
        <Logo className="w-full h-full" />
        <Image className={`w-full h-full fixed -z-50 object-cover ${showImage? "visible": "invisible"}`} src={currentImage.src} alt={currentImage.alt} width={1400} height={1080}></Image>
        <ProjectList
          className="absolute top-0 left-0 px-8 pt-40 md:px-12"
          projects={projects}
        />
        <Footer />
      </main>
    </>
  );
}
