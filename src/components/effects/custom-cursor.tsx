import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Two-part cursor: a tight dot that tracks the pointer almost 1:1,
 * and a larger blurred ring that eases behind it. The lag between
 * the two is what sells the "premium" feel — a single cursor that
 * follows exactly feels mechanical, the trailing ring feels alive.
 *
 * Disabled entirely on touch devices (no real cursor to replace)
 * and skipped under prefers-reduced-motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || prefersReducedMotion) return;

    document.body.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    const followerPos = { x: 0, y: 0 };

    const quickDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const quickDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const quickFollowerX = gsap.quickTo(follower, "x", { duration: 0.45, ease: "power3.out" });
    const quickFollowerY = gsap.quickTo(follower, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      quickDotX(e.clientX);
      quickDotY(e.clientY);
      quickFollowerX(e.clientX);
      quickFollowerY(e.clientY);
      followerPos.x = e.clientX;
      followerPos.y = e.clientY;
    };

    // Magnetic + scale feedback on interactive elements. Uses event
    // delegation on `pointerover`/`pointerout` (which bubble) instead of
    // binding mouseenter/mouseleave to a static NodeList — sections below
    // the fold mount later via scroll-triggered animation, so a static
    // query at mount time would miss them.
    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element && el.closest("a, button, [data-cursor-hover]");

    const onPointerOver = (e: PointerEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(follower, { scale: 1.8, opacity: 0.6, duration: 0.3 });
      }
    };
    const onPointerOut = (e: PointerEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
    </>
  );
}
