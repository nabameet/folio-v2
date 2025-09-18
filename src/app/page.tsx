import { getAllContent } from "@/cms/utils/mdx";
import Home from "@/components/Home";
import { Project } from "@/types/project";

/**
 * Home page route component
 *
 * Fetches all project content on the server and passes to Home component
 * Uses server-side data fetching for optimal performance
 */
export default async function HomePage() {
  // Fetch data on server - this should be async
  const projects: Project[] = await getAllContent();

  return <Home projects={projects} />;
}
