"use client"

import Logo from "@/components/logo/Logo";
import { ProjectList } from "@/cms/organisms/ProjectList";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useState } from "react";
import { MDXContent } from "@/cms/types";

export default function Home({projects} : {projects: MDXContent[]}) {
	// State to track the currently hovered project's image
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string } | null>(null);

  // Show image when there's a hovered project
  const showImage = currentImage !== null;

  // Handle project hover - set the current image
  const handleProjectHover = (project: MDXContent) => {
    setCurrentImage({
      src: project.metadata.image,
      alt: project.metadata.title
    });
  };

  // Handle hover end - hide the image
  const handleProjectHoverEnd = () => {
    setCurrentImage(null);
  };

	return (
    <>
		<main className="flex relative justify-center items-center w-full h-screen"> {/* stroke-background dark:stroke-foreground text-background mix-blend-difference dark:text-foreground */}
        <Logo className="w-full h-full" />
        { currentImage && <Image className={`w-1/2 -z-50 fixed right-0 px-8 md:px-12 object-cover ${showImage? "visible": "invisible"}`} src={currentImage?.src} alt={currentImage?.alt} width={1400} height={1080} /> }
        <ProjectList
          className="absolute top-0 left-0 px-8 pt-40 md:px-12"
          projects={projects}
					onProjectHover={handleProjectHover}
          onProjectHoverEnd={handleProjectHoverEnd}
        />
        <Footer />
    </main>
    </>
  )
}