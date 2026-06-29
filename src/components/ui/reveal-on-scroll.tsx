import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  blur?: boolean;
  delay?: number;
  /** Stagger reveal for direct children instead of animating the wrapper as one block */
  staggerChildren?: boolean;
  stagger?: number;
};

/**
 * Wraps content in a scroll-triggered fade/rise reveal with optional
 * blur-to-sharp focus (used heavily across feature + showcase sections
 * per the brief's "reveal with depth, blur, and smooth motion" spec).
 *
 * Centralizing this in one component means every section gets the same
 * easing and trigger thresholds, rather than 13 slightly-different
 * hand-rolled ScrollTrigger calls that would drift out of sync.
 */
export default function RevealOnScroll({
  children,
  className,
  y = 40,
  blur = true,
  delay = 0,
  staggerChildren = false,
  stagger = 0.12,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = staggerChildren ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y,
          filter: blur ? "blur(8px)" : "blur(0px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          delay,
          ease: "power3.out",
          stagger: staggerChildren ? stagger : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [y, blur, delay, staggerChildren, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
