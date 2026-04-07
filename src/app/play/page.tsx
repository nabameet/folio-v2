import { Footer } from "@/components/footer";
import ParallaxGallery from "@/components/ParalaxGallery";
import Link from "next/link";

export default function Play() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col">
      <p className="absolute top-0 left-0 flex flex-col gap-4 px-8 pt-40 md:px-12">
        coming soon:
        <span className="italic">under construction</span>
      </p>
      {/* <div className="absolute top-0 left-0 z-50 flex flex-col gap-4 px-8 pt-40 md:px-12">
        <div className="z-40 flex flex-col gap-4 lowercase">
          <h1 className="">fun stuff:</h1>
          <ul className="">
            {[
              {
                slug: "paradox-of-healing",
                href: "https://heal.nabameet.com",
                title: "paradox of healing",
              },
            ].map((project, index) => (
              <li key={project.slug} className="flex gap-2">
                <span className="rounded-[100%] border pr-2 pl-8 text-sm">
                  {index + 1}
                </span>
                <Link
                  className="italic underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.href}
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ParallaxGallery /> */}
      <div className="flex-1" />
      <Footer />
    </main>
  );
}
