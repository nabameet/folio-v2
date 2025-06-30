// No more speaking. Best impact. Leave at bol

"use client";

// import GlassButton from "@/components/glass/GlassButton";
import Logo from "@/components/logo/Logo";
import ProjectList from "@/components/ProjectList";
import { ProjectLink } from "@/types/project";

export default function Home() {
  const projectLinks: ProjectLink[] = [
    { label: "young founder summit", slug: "yfs" },
    { label: "faekbank", slug: "faekbank" },
    { label: "kiran nadar museum of art", slug: "knma" },
    { label: "cynic's calcutta", slug: "cynics-calcutta" },
    { label: "paradox of healing", slug: "paradox-of-healing" },
    { label: "vaari", slug: "vaari" },
  ];

  return (
    <>
      <main className="w-full h-screen flex items-center justify-center relative">
        <Logo className="w-full h-full" />
        <ProjectList
          className="absolute top-0 right-0 pt-40 p-12"
          projectLinks={projectLinks}
        />
      </main>
    </>
  );
}
