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
import Link from "next/link";
import { usePathname } from "next/navigation";

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const toggleInfo = useCallback(() => setIsInfoOpen((prev) => !prev), []);

  const navItems: NavItem[] = [
    { type: "button", label: "info", onClick: toggleInfo },
  ];

  const aboutText =
    "i’m nabameet, a visual designer. i blend eye candy with unconventional storytelling, experimentation (and sometimes a bit of code) to create identities that feel alive and built to thrive in the real world.";

  const contactPrechorusText = "rather break the mold than play it safe?";
  const contactTitleText = "i'm in. ";
  const email = "hi@nabameet.com";
  const xUsername = "nabameet";

  const currentPath = usePathname();

  return (
    <>
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
            <span className="flex items-center">
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
              &nbsp;&nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            </span>
          </p>
        </InfoAbout>
        <InfoContact xUsername={xUsername}>
          <p></p>
        </InfoContact>
      </InfoDrawer>
      <div className="">{children}</div>
      {currentPath === "/" || currentPath === "/play" ? "" : <Footer />}
    </>
  );
};
