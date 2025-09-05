"use client";

import { NavItem } from "@/types/nav";
import clsx from "clsx";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import React from "react";

interface NavProps {
  items?: NavItem[];
  children?: React.ReactNode;
  isInfoOpen: boolean;
}

export const Nav = ({ items = [], children, isInfoOpen }: NavProps) => {
  const currentPath = usePathname();
  const lastSlashIndex = currentPath.lastIndexOf("/");
  let previousPath =
    lastSlashIndex > 0 ? currentPath.slice(0, lastSlashIndex) : "/"; // If previousPath is "/work", go to "/" instead
  if (previousPath === "/work") {
    previousPath = "/";
  }
  return (
    <nav className="fixed z-50 flex w-full justify-between gap-12 p-8 md:p-12">
      {" "}
      {/* text-background dark:text-foreground mix-blend-difference */}
      <Link
        className={
          currentPath === "/" || currentPath === "/play"
            ? "invisible"
            : "visible"
        }
        href={previousPath}
      >
        back
      </Link>
      <ul className="flex gap-12">
        {items.map((item, idx) =>
          item.type === "link" ? (
            <Link
              className=""
              key={idx}
              href={item.href}
              onClick={item.onClick}
            >
              {item.label}
            </Link>
          ) : (
            <button
              className={clsx("", isInfoOpen ? "italic" : "")}
              key={idx}
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ),
        )}
        {children}
      </ul>
    </nav>
  );
};
