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

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const toggleInfo = useCallback(() => setIsInfoOpen((prev) => !prev), []);

  const navItems: NavItem[] = [
    { type: "button", label: "info", onClick: toggleInfo },
  ];

  const aboutText =
    "hi, i'm nabameet, a visual designer and creative developer working from my dorm room at delhi technological university. while my more expressive projects often explore the darker nuances of life, my brand design work is crafted to resonate with market research and connect deeply with my client’s audience.";

  const contactTitleText = "hmu? available worldwide.";
  const email = "hi@nabameet.com";
  const xUsername = "nabameet";
  return (
    <>
      <Cursor />
      <Nav isInfoOpen={isInfoOpen} items={navItems}>
        <WorkPlayToggle />
      </Nav>
      <InfoDrawer isOpen={isInfoOpen}>
        <InfoAbout>{aboutText}</InfoAbout>
        <InfoContact email={email} xUsername={xUsername}>
          {contactTitleText}
        </InfoContact>
      </InfoDrawer>
      <div className="">{children}</div>
      <Footer />
    </>
  );
};
