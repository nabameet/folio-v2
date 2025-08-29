"use client";

import { useState, useCallback } from "react";

import { Cursor } from "@/components/cursor/Cursor";
import { Nav } from "@/components/Nav";
import { InfoDrawer } from "@/components/InfoDrawer";
import { WorkPlayToggle } from "@/components/WorkPlayToggle";
import { NavItem } from "@/types/nav";
import InfoAbout from "@/components/info/InfoAbout";
import InfoContact from "@/components/info/InfoContact";
import Footer from "@/components/Footer";
import ImagePreloader from "@/components/ImagePreloader";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const toggleInfo = useCallback(() => setIsInfoOpen((prev) => !prev), []);

  const navItems: NavItem[] = [
    { type: "button", label: "info", onClick: toggleInfo },
  ];

  const aboutText = "i’m nabameet, a multidisciplinary designer. i blend eye candy with unconventional storytelling, experimentation (and sometimes a bit of code) to create identities that feel alive and built to thrive in the real world.";

  const contactPrechorusText = "rather break the mold than play it safe?";
  const contactTitleText = "i'm in. ";
  const email = "hi@nabameet.com";
  const xUsername = "nabameet";

    const currentPath = usePathname();
  
  return (
    <>
      <ImagePreloader>
      <Cursor />
        
      <Nav isInfoOpen={isInfoOpen} items={navItems}>
        <WorkPlayToggle />
      </Nav>
      <InfoDrawer isOpen={isInfoOpen}>
        <InfoAbout>
          <p>{aboutText}</p>
          <p>
            {contactPrechorusText}
            <br />
            {contactTitleText}
          send a &nbsp;
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="italic underline"
            href={"mailto:" + email}
          >
            {email}
          </Link>
        </p>
        </InfoAbout>
        <InfoContact xUsername={xUsername}>
          <p></p>
        </InfoContact>
      </InfoDrawer>
      <div className="">{children}</div>
      {currentPath === '/' || currentPath === '/play' ? "" : <Footer />}
      
      </ImagePreloader>
    </>
  );
};
