"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

// 1. Configuration for the 26 blocks (Transcribed from your CSS)
interface BlockConfig {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
}

const ITEMS: BlockConfig[] = [
  { top: "50%", right: "30%" },
  { top: "5%", right: "30%" },
  { top: "25%", left: "15%" },
  { top: "50%", left: "10%" },
  { top: "8%", left: "20%" },
  { top: "40%", left: "0%" },
  { top: "65%", left: "3%" },
  { top: "75%", left: "20%" },
  { top: "35%", right: "15%" },
  { top: "25%", left: "40%" },
  { bottom: "30%", left: "30%" },
  { bottom: "65%", right: "3%" },
  { bottom: "40%", right: "0%" },
];

// Helper to switch between local assets and placeholders
const getImagePath = (index: number) => {
  // Option A: Use your local assets (ensure they are in /public/assets/)
  return `/gallery/${index + 1}.webp`;

  // Option B: Placeholders for immediate testing
  // return `https://picsum.photos/300/400?random=${index}`;
};

export default function ParallaxGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  // Store references to the DOM elements
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  // Store metadata (center positions and GSAP tweens) to avoid reading DOM constantly
  const metadataRef = useRef<
    { cx: number; cy: number; tween: gsap.core.Tween }[]
  >([]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    // --- Logic 1: Setup Proximity Tweens ---
    const radius = 300;
    const maxScale = 3;
    const radius2 = radius * radius;

    // Initialize metadata for each block
    blocksRef.current.forEach((block, i) => {
      if (!block) return;

      const b = block.getBoundingClientRect();

      // Calculate center point (including scroll offset)
      const cx = b.left + b.width / 2 + window.scrollX;
      const cy = b.top + b.height / 2 + window.scrollY;

      // Create the paused GSAP tween
      const tween = gsap
        .to(block, { scale: maxScale, ease: "power1.in", paused: true })
        .progress(0); // Ensure it starts at 0

      metadataRef.current[i] = { cx, cy, tween };
    });

    // --- Logic 2: Mouse Movement Handler ---
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, pageX, pageY } = e;

      // A. Parallax Pan Logic
      const xDecimal = clientX / window.innerWidth;
      const yDecimal = clientY / window.innerHeight;

      const maxX = gallery.offsetWidth - window.innerWidth;
      const maxY = gallery.offsetHeight - window.innerHeight;

      const panX = maxX * xDecimal * -1;
      const panY = maxY * yDecimal * -1;

      // Using GSAP for the pan instead of animate() for consistency
      gsap.to(gallery, {
        x: panX,
        y: panY,
        duration: 4, // 4000ms delay effect
        ease: "power1.out",
        overwrite: "auto",
      });

      // B. Proximity Scale Logic
      metadataRef.current.forEach((meta) => {
        const dx = (meta.cx - pageX) ** 2;
        const dy = (meta.cy - pageY) ** 2;
        const distSq = dx + dy;

        if (distSq < radius2) {
          // Calculate progress based on distance (closer = higher progress)
          const progress = 1 - distSq / radius2;
          meta.tween.progress(progress);
        } else {
          // Reset if out of range
          meta.tween.progress(0);
        }
      });
    };

    // --- Logic 3: Resize Handler ---
    // Recalculate center points if window resizes
    const handleResize = () => {
      blocksRef.current.forEach((block, i) => {
        if (!block || !metadataRef.current[i]) return;
        const b = block.getBoundingClientRect();
        metadataRef.current[i].cx = b.left + b.width / 2 + window.scrollX;
        metadataRef.current[i].cy = b.top + b.height / 2 + window.scrollY;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      // Clean up GSAP tweens
      metadataRef.current.forEach((meta) => meta.tween.kill());
    };
  }, []);

  return (
    <div className="absolute inset-0 h-screen w-full overflow-hidden p-0">
      {/* Gallery Container */}
      <div
        id="gallery"
        ref={galleryRef}
        className="relative h-[75vmax] w-[95vmax]"
      >
        {ITEMS.map((style, index) => (
          <div
            key={index}
            ref={(el) => {
              blocksRef.current[index] = el;
            }}
            // 1. Container holds dimensions, position, and animation logic
            className="block-item absolute z-10 size-60 will-change-transform hover:z-20"
            style={style} // Keep external styles (transforms, etc.) here
          >
            <Image
              src={getImagePath(index)}
              alt="" // 2. Alt text is mandatory
              fill // 3. Replaces manual width/height, fills the parent
              className="object-contain object-center" // 4. Replaces background-size/position
              sizes="(max-width: 768px) 100vw, 240px" // 5. Optimization suggestion
              priority={index < 4} // Optional: Load first few images immediately
            />
          </div>
        ))}
      </div>
    </div>
  );
}
