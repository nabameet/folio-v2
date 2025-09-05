"use client";

import Logo from "@/components/logo/Logo";
import { ProjectList } from "@/cms/organisms/ProjectList";
import Footer from "@/components/Footer";
import { useState } from "react";
import { MDXContent } from "@/cms/types";
import ProjectSnapshot from "./ProjectSnapshot";

export default function Home({ projects }: { projects: MDXContent[] }) {
  // State to track the currently hovered project's image
  const [currentImage, setCurrentImage] = useState<{
    src: string;
    alt: string;
    tags: string;
  } | null>(null);

  // Show image when there's a hovered project
  const showImage = currentImage !== null;

  // Handle project hover - set the current image
  const handleProjectHover = (project: MDXContent) => {
    setCurrentImage({
      src: project.metadata.image,
      alt: project.metadata.title,
      tags: project.metadata.tags,
    });
  };

  // Handle hover end - hide the image
  const handleProjectHoverEnd = () => {
    setCurrentImage(null);
  };

  return (
    <>
      <main className="relative flex h-screen w-full items-center justify-center">
        <Logo className="h-full w-full max-w-screen-2xl" />

        {/* Always render ProjectSnapshot - no conditional */}
        <ProjectSnapshot
          showImage={showImage}
          currentImage={
            currentImage || {
              src: "",
              alt: "",
              tags: "",
            }
          }
        />

        <ProjectList
          className="absolute top-0 left-0 px-8 pt-40 md:px-12"
          projects={projects}
          onProjectHover={handleProjectHover}
          onProjectHoverEnd={handleProjectHoverEnd}
        />
        <Footer />
      </main>
    </>
  );
}
