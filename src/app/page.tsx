// WHAT'S NEXT, BRO? NO RUMINATING.

// ------------------------------------------------------------------------------------

// TODAY:

// DONE:  Write year, scope, client in each project
// DONE:  Make the footer
// TODO:  Update Project copy (Remove vim line)
// CHECKPOINT: LESSGO U CAN APPLY TO JOBS NOW!!!!!
// TODO:  Make the build together section like nivedha with a clear call to action
// TODO:  Background change to image
// TODO:  Logo resizes and goes to nav before page change
// TODO:  Live

// ------------------------------------------------------------------------------------

// AFTER ABOVE IS DONE:

// TODO:  Load entire website upfront
// TODO:  Loader ("nabameet" being written like Apple's "hello")
// TODO?: Visuals on home page
// TODO:  FIX: Cursor doesn't resize on page change, stays big
// TODO:  Fix work page metadata, get it checked by ai first, then soumit
// LATER: Play Page
// LATER: COMPLETE FIX: Project Page (Temp Patchwork Done)

// ------------------------------------------------------------------------------------

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
