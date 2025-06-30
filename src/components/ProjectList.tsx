import { ProjectLink } from "@/types/project";
import clsx from "clsx";
import Link from "next/link";

export default function ProjectList({
  projectLinks,
  className,
}: {
  projectLinks: ProjectLink[];
  className: string;
}) {
  return (
    <ul className={clsx("flex flex-col gap-2 items-end", className)}>
      {projectLinks.map((projectLink, key) => (
        <Link
          className="flex justify-between"
          key={key}
          href={"/work/" + projectLink.slug}
        >
          {projectLink.label}
          {/* &nbsp;&nbsp;&nbsp;
          <span className="pl-8 pr-1 inline-flex border rounded-[100%]">
            {key + 1}
          </span> */}
        </Link>
      ))}
    </ul>
  );
}
