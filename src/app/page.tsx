// No more speaking. Best impact. Leave at bol

// TODO:  Project Page
// TODO:  Background change to image
// TODO:  Play Page
// TODO?: Visuals on home page

import Logo from "@/components/logo/Logo";
import { getAllContent } from "@/cms/utils/mdx";
import { ProjectList } from "@/cms";

export default function Home() {
  const projects = getAllContent();

  return (
    <>
      <main className="flex relative justify-center items-center w-full h-screen">
        <Logo className="w-full h-full" />
        <ProjectList
          className="absolute top-0 left-0 px-8 pt-40 md:px-12"
          projects={projects}
        />
      </main>
    </>
  );
}
