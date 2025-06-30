import { useEffect } from "react";
import gsap from "gsap";

export const useCursorEffect = () => {
  useEffect(() => {
    const cursor = document.querySelector(".cursorCustom");
    const follower = document.querySelector(".cursorFollower");

    if (!cursor || !follower) return;

    const move = (e: MouseEvent) => {
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    };

    const handleMouseEnter = () => {
      gsap.to(follower, { scale: 1.75, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(follower, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 1 });
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    function attachListeners() {
      const links = document.querySelectorAll(
        "a, button, [data-cursor='hover']"
      );
      links.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    }

    attachListeners();

    // Observe DOM changes and re-attach listeners if needed
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
      // Optionally: remove listeners from links here
    };
  }, []);
};
