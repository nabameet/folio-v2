import { NavItem } from "@/types/nav";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface NavProps {
  items?: NavItem[];
  children?: React.ReactNode;
  isInfoOpen: boolean;
}

export const Nav = ({ items = [], children, isInfoOpen }: NavProps) => (
  <nav className="fixed w-full flex gap-12 p-12 justify-end z-50">
    <ul className="flex gap-12">
      {items.map((item, idx) =>
        item.type === "link" ? (
          <Link className="" key={idx} href={item.href} onClick={item.onClick}>
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
        )
      )}
    </ul>

    {children}
  </nav>
);
