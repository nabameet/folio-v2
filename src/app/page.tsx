// WHAT'S NEXT, BRO? NO RUMINATING.

// ------------------------------------------------------------------------------------

// TODAY: (DAY 2 - over, DAY 3 upcoming - 27/8/2025)

// DONE:  Write year, scope, client in each project
// DONE:  Make the footer
// DONE:  Change info copy (Figure out, optimize)
// DONE:  Update Project copy (Remove vim line)
// DONE:  Add hmu in footer (CTA)

// DONE:  CHECKPOINT: LESSGO U CAN APPLY TO JOBS NOW!!!!!

// DONE:  Additional project info (tags) on homepage
// DONE:  Good scroll (Lenis)
// DONE:  Dark mode fix
// HALF:  Background change to image
// TODO:  Fix Project List's order
// TODO:  Logo resizes and goes to nav before page change
// TODO:  Load entire website upfront
// TODO:  Basic Loader (1-100% followed by handwritten nabameet stroke to fill like before)
// TODO:  Live

// ------------------------------------------------------------------------------------

// DETAILS:

// TODO: When info is visible, push fixed footer down with rest of content
// TODO: Make info collapse animation the same as expand
// TODO: on project page, info should show even when project is scrolled down.

// ------------------------------------------------------------------------------------

// AFTER ABOVE IS DONE:

// TODO:  Page Transitions
// TODO:  Make the build together section like nivedha with a clear call to action
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
import Image from "next/image";

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
      <main className="flex relative justify-center stroke-background dark:stroke-foreground text-background dark:text-foreground items-center w-full h-screen">
        <Logo className="w-full h-full fixed" />
        <Image className={`w-full h-full fixed -z-50 object-cover ${showImage? "visible": "invisible"}`} src={currentImage.src} alt={currentImage.alt} width={1400} height={1080}></Image>
        <ProjectList
          className="absolute top-0 left-0 px-8 pt-40 md:px-12 mix-blend-difference"
          projects={projects}
        />
      </main>
    </>
  );
}
