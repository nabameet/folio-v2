import { getAllContent } from "@/cms/utils/mdx";
import Home from "@/components/Home";

export default function HomePage() {
  const projects = getAllContent();

  return <Home projects={projects} />;
}
