// No more speaking. Best impact. Leave at bol

import Logo from "@/components/logo/Logo";
import { getAllContent } from "@/cms/utils/mdx";
import { ProjectList } from "@/cms";

export default function Home() {
  // ];
  const projects = getAllContent();

  return (
    <>
      <main className="w-full h-screen flex items-center justify-center relative">
        <Logo className="w-full h-full" />
        <ProjectList
          className="absolute top-0 right-0 pt-40 p-12"
          projects={projects}
        />
      </main>
    </>
  );
}
