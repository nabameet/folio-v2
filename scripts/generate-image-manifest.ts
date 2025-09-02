// scripts/generate-image-manifest.ts
import fs from "fs";
import path from "path";

interface ImageManifestConfig {
  publicDir: string;
  outputPath: string;
  imageExtensions: string[];
}

const config: ImageManifestConfig = {
  publicDir: "./public",
  outputPath: "./src/lib/image-manifest.ts",
  imageExtensions: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif"],
};

function getAllImages(dirPath: string, arrayOfFiles: string[] = []): string[] {
  try {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const fullPath = path.join(dirPath, file);

      if (fs.statSync(fullPath).isDirectory()) {
        // Recursively scan subdirectories
        arrayOfFiles = getAllImages(fullPath, arrayOfFiles);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (config.imageExtensions.includes(ext)) {
          // Convert to web path (remove 'public' prefix and normalize slashes)
          const webPath = fullPath
            .replace(/\\/g, "/") // Convert Windows backslashes
            .replace(/^\.?\/public/, "") // Remove public prefix
            .replace(/^\/+/, "/"); // Ensure single leading slash

          arrayOfFiles.push(webPath.startsWith("/") ? webPath : "/" + webPath);
        }
      }
    });

    return arrayOfFiles;
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
    return arrayOfFiles;
  }
}

function generateImageManifest(): void {
  console.log("🔍 Scanning public directory for images...");

  if (!fs.existsSync(config.publicDir)) {
    console.error(`❌ Public directory not found: ${config.publicDir}`);
    process.exit(1);
  }

  const imageList = getAllImages(config.publicDir);

  // Ensure lib directory exists
  const libDir = path.dirname(config.outputPath);
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  // Generate TypeScript manifest content
  const manifestContent = `// Auto-generated image manifest
// Generated on: ${new Date().toISOString()}
// Total images: ${imageList.length}

export const ALL_IMAGES: readonly string[] = ${JSON.stringify(imageList, null, 2)} as const;

export const IMAGE_CATEGORIES = {
  hero: ALL_IMAGES.filter(img => img.includes('/hero/')),
  projects: ALL_IMAGES.filter(img => img.includes('/projects/')),
  gallery: ALL_IMAGES.filter(img => img.includes('/gallery/')),
  icons: ALL_IMAGES.filter(img => img.includes('/icons/')),
  backgrounds: ALL_IMAGES.filter(img => img.includes('/bg/') || img.includes('/backgrounds/')),
} as const;

export const CRITICAL_IMAGES = [
  ...IMAGE_CATEGORIES.hero,
  // Add other critical images here
].filter(Boolean) as string[];

export const NON_CRITICAL_IMAGES = ALL_IMAGES.filter(
  img => !CRITICAL_IMAGES.includes(img)
) as string[];

export type ImagePath = typeof ALL_IMAGES[number];
`;

  try {
    fs.writeFileSync(config.outputPath, manifestContent);
    console.log(`✅ Generated image manifest with ${imageList.length} images`);
    console.log(`📁 Categories found:`);

    const categories = {
      hero: imageList.filter((img) => img.includes("/hero/")).length,
      projects: imageList.filter((img) => img.includes("/projects/")).length,
      gallery: imageList.filter((img) => img.includes("/gallery/")).length,
      icons: imageList.filter((img) => img.includes("/icons/")).length,
      backgrounds: imageList.filter(
        (img) => img.includes("/bg/") || img.includes("/backgrounds/"),
      ).length,
      other: imageList.filter(
        (img) =>
          !img.includes("/hero/") &&
          !img.includes("/projects/") &&
          !img.includes("/gallery/") &&
          !img.includes("/icons/") &&
          !img.includes("/bg/") &&
          !img.includes("/backgrounds/"),
      ).length,
    };

    Object.entries(categories).forEach(([category, count]) => {
      if (count > 0) console.log(`  - ${category}: ${count} images`);
    });
  } catch (error) {
    console.error("❌ Error writing manifest file:", error);
    process.exit(1);
  }
}

// Run the generator
generateImageManifest();
