# A Beautiful, Modular MDX-Based CMS

Welcome! This is a fully modular, atomic, and rigorously-tested MDX-based CMS designed to **just work, out of the box.** Drop it into any React or Next.js project to instantly add a powerful, content-managed section for a portfolio, blog, or anything you can imagine.

It's built with clean architecture, dependency injection, and reusability at its core, so you can extend it, customize it, or use it as-is with absolute confidence.

---

## ✅ Pre-requisites

For this module to work perfectly, your project should be:
- A **React** or **Next.js** application.
- Using **TypeScript**.
- Set up with a module path alias where `@/` points to your `src/` directory (standard in Next.js).

---

## ✨ Features

-   **Plug & Play**: Copy one folder and you're done.
-   **Atomic Design**: A clean, scalable structure of `atoms`, `molecules`, and `organisms`.
-   **Fully Tested**: Comprehensive test coverage with Vitest and React Testing Library ensures reliability.
-   **Configurable**: Easily change content directories, URLs, and paths from a central config file.
-   **SEO Ready**: Built-in helpers for generating metadata and static pages in Next.js.
-   **Developer-Friendly**: Clean code, clear patterns, and this comprehensive documentation.

---

## 🚀 Quick Start: It Just Works

Follow these three steps to get up and running in minutes.

### 1. Copy the CMS
Copy the entire `src/cms` folder from this project and place it directly into your project's `src` directory.

### 2. Place Your Content
By default, the CMS looks for your content in `src/projects`. Create this folder and add your `.mdx` files.

Your MDX files **must** contain a **frontmatter** block at the top:
```mdx
---
title: My Awesome Project
publishedAt: 2024-01-01
summary: A short, compelling summary of this project.
tags: react,nextjs,design
image: /images/projects/awesome-project.png
---

# This is the rest of your content.

You can write standard Markdown and use custom React components here.
```

### 3. Use the Components
In your Next.js pages, import and use the CMS components.

**To show a list of all projects (e.g., in `/app/work/page.tsx`):**
```tsx
import { ProjectList } from '@/cms';

export default function WorkPage() {
  return (
    <section>
      <h1>My Work</h1>
      <ProjectList />
    </section>
  );
}
```

**To show a single project page (e.g., in `/app/work/[slug]/page.tsx`):**
```tsx
import { ProjectDetail, getProjectStaticParams, getProjectMetadata } from '@/cms';

// Generates all project pages at build time
export async function generateStaticparams() {
  return getProjectStaticParams();
}

// Generates SEO metadata for the page
export async function generateMetadata({ params }) {
  return getProjectMetadata({ slug: params.slug, author: 'Your Name' });
}

export default function ProjectPage({ params }) {
  return <ProjectDetail slug={params.slug} />;
}
```
And that's it! You now have a fully functional, content-managed section on your site.

---

## ⚙️ Configuration

All settings are in `src/cms/config/content.ts`. Update them to match your project.

---

## 🧩 Extending and Customizing

This CMS is designed to be extended.
-   **Change the Look**: Modify the styles of the components in `src/cms/organisms`, `molecules`, and `atoms`.
-   **Add a Component**: Want a custom callout box in your MDX? Create it as an atom/molecule and add it to the `MDXContentRenderer`.
-   **Change Data Source**: The dependency injection pattern makes it easy. You can pass your own `projects` array to `ProjectList` or a `project` object to `ProjectDetail` instead of letting them fetch automatically.

---

## 🧪 Testing

The CMS is fully tested. To run the tests and verify everything is working correctly in your project:

1.  **Install Dev Dependencies**:
    ```sh
    npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
    # Or if you use Bun:
    bun add --dev vitest @testing-library/react @testing-library/jest-dom jsdom
    ```

2.  **Run the Test Suite**:
    ```sh
    npx vitest run
    ```

**Important**: You must use a **Node.js-based runner** like `npx vitest` for tests to pass. Bun's built-in test runner is not yet fully compatible with the browser environment required by React Testing Library.

---

## 📁 Folder Structure

- **atoms/** — Smallest UI elements (e.g., `ProjectImage`)
- **molecules/** — Combinations of atoms (e.g., `ProjectImageGrid`)
- **organisms/** — Complex UI blocks (e.g., `MDXContentRenderer`, `ProjectList`, `ProjectDetail`)
- **utils/** — Pure utility functions (e.g., MDX parsing, date formatting, Next.js helpers)
- **types/** — TypeScript types/interfaces
- **config/** — Configurable settings (e.g., content directory)
- **index.ts** — Main entry point (exports everything)

---

## 🚀 Features & Exports

### Content Utilities
- `getAllContent()` — Get all MDX content as an array
- `getProjectBySlug(slug)` — Get a single project by slug
- `parseFrontmatter()` — Parse MDX frontmatter

### UI Components
- `ProjectList` — List all projects (with optional custom render)
- `ProjectDetail` — Display a single project by slug (with optional custom header/meta)
- `MDXContentRenderer` — Render MDX content with custom components
- `ProjectImage`, `ProjectImageGrid` — Atomic image components

### Next.js Helpers
- `getProjectStaticParams()` — For Next.js dynamic routes (SSG)
- `getProjectMetadata()` — For Next.js SEO/metadata

### Types
- `MDXContent`, `MDXMetadata`, `CMSConfig` — TypeScript types for content and config

### ProjectList and ProjectDetail Props
- `ProjectList` now accepts a `projects` prop (array of MDXContent). If not provided, it fetches from your content directory.
- `ProjectDetail` now accepts a `project` prop (MDXContent). If not provided, it will use the `slug` prop to fetch from your content directory.

**This makes testing and custom data injection easy!**

#### Example: Testing with Mock Data
```tsx
import { ProjectList, ProjectDetail } from './cms';

const mockProjects = [/* ...array of mock MDXContent... */];
const mockProject = {/* ...single mock MDXContent... */};

// In your tests:
render(<ProjectList projects={mockProjects} />);
render(<ProjectDetail project={mockProject} />);
```

You can now use `bun test` for all tests, including components, with no mocking required.

---

## 🛠️ Usage Examples

### 1. Project List Page
```tsx
import { ProjectList } from './cms';

export default function ProjectsPage() {
  return <ProjectList />;
}
```

#### Customizing List Items
```tsx
<ProjectList renderItem={project => (
  <article key={project.slug}>
    <h2>{project.metadata.title}</h2>
    <p>{project.metadata.summary}</p>
    <a href={`/work/${project.slug}`}>Read more</a>
  </article>
)} />
```

### 2. Project Detail Page (Dynamic Route)
```tsx
import { ProjectDetail, getProjectStaticParams, getProjectMetadata } from './cms';

export function generateStaticParams() {
  return getProjectStaticParams();
}

export function generateMetadata({ params }) {
  return getProjectMetadata({ slug: params.slug, baseUrl: 'https://yourdomain.com', author: 'Your Name' });
}

export default function ProjectPage({ params }) {
  return <ProjectDetail slug={params.slug} />;
}
```

#### Customizing Header/Meta
```tsx
<ProjectDetail
  slug={params.slug}
  renderHeader={project => <h1 style={{ color: 'tomato' }}>{project.metadata.title}</h1>}
  renderMeta={project => <span>{project.metadata.tags}</span>}
/>
```

---

## 📝 Best Practices
- Keep your MDX files in the configured content directory (default: `src/projects`).
- Use frontmatter in your MDX files for metadata (title, summary, tags, image, etc.).
- Use the atomic design structure for new UI components.
- Use the Next.js helpers for static generation and SEO.

---

## 💡 Why This CMS?
- **Plug-and-play:** Copy the folder, configure, and use.
- **Atomic:** UI is broken down for maximum reusability.
- **Framework-agnostic:** Works in any React/Next.js project.
- **Type-safe:** All logic and data are strongly typed.
- **Scalable:** Add new features or swap out parts with minimal friction.

---

## 🧪 Testing

This CMS comes with unit and component tests for all utilities and UI components using Vitest and React Testing Library.

### Running Tests

```sh
bun test
# or
bun run test
```

### What is Covered
- Utilities: MDX parsing, file reading, date formatting, image utils
- Components: ProjectList, ProjectDetail (with all attributes and parameters, using mock data)

### Adding More Tests
- Add `.test.ts` or `.test.tsx` files alongside your components or utilities in the `cms` folder.
- Use `@testing-library/react` for component tests and `vitest` for logic/utilities.
- Mock data as needed for isolation.

---

## ❓ FAQ

**Q: Can I use this for blog posts, not just projects?**  
A: Yes! Just point `contentDir` to your blog MDX folder and adjust the UI as needed.

**Q: How do I add custom MDX components?**  
A: Pass them to `MDXContentRenderer` via the `components` prop, or extend the default components in `organisms/MDXContentRenderer.tsx`.

**Q: How do I add more metadata fields?**  
A: Update the `MDXMetadata` type in `types/index.ts` and use them in your MDX frontmatter.

---

**This CMS is designed for maximum readability, modularity, and scalability.** 