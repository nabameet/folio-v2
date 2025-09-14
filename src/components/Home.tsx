"use client";

import Logo from "@/components/logo/Logo";
import { ProjectList } from "@/cms/organisms/ProjectList";
import Footer from "@/components/Footer";
import { useState } from "react";
import { MDXContent } from "@/cms/types";
import ProjectSnapshot from "./ProjectSnapshot";

export default function Home({ projects }: { projects: MDXContent[] }) {
  const [currentProject, setCurrentProject] = useState<MDXContent | null>(null);
  const [showImage, setShowImage] = useState(false);

  const handleProjectHover = (project: MDXContent) => {
    setCurrentProject(project);
    setShowImage(true);
  };

  const handleProjectHoverEnd = () => {
    setShowImage(false); // will trigger fade out
  };

  return (
    <main className="relative flex h-screen w-full items-center justify-center">
      <Logo className="h-full w-full max-w-screen-2xl" />

      <ProjectSnapshot
        showImage={showImage}
        currentImage={{
          src: currentProject?.metadata.image || "",
          alt: currentProject?.metadata.title || "",
          tags: currentProject?.metadata.tags || "",
          slug: currentProject?.slug || "placeholder",
        }}
      />

      <ProjectList
        className="absolute top-0 left-0 px-8 pt-40 md:px-12"
        projects={projects}
        onProjectHover={handleProjectHover}
        onProjectHoverEnd={handleProjectHoverEnd} // call on hover leave
      />
      <Footer/>
    </main>
  );
}
