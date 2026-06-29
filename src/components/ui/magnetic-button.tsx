import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type MagneticButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
};

const PRIMARY_GLOW_A = "0 0 24px rgba(124,58,237,0.45)";
const PRIMARY_GLOW_B = "0 0 36px rgba(34,211,238,0.55)";

export default function MagneticButton({
  children,
  variant = "primary",
  size = "default",
  showArrow = false,
  className,
  onClick,
  href,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  // Entrance + breathing glow (primary only)
  useEffect(() => {
    const el = btnRef.current;
    if (!el || variant !== "primary") return;

    gsap.set(el, { opacity: 0, scale: 0.92 });
    let breathe: gsap.core.Tween | null = null;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          onComplete: () => {
            breathe = gsap.to(el, {
              boxShadow: PRIMARY_GLOW_B,
              duration: 1.4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        });
      },
    });

    return () => {
      trigger.kill();
      breathe?.kill();
    };
  }, [variant]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: relX * 0.25, y: relY * 0.4, duration: 0.4, ease: "power3.out" });
    if (arrowRef.current) gsap.to(arrowRef.current, { x: 4, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    if (arrowRef.current) gsap.to(arrowRef.current, { x: 0, duration: 0.3 });
  };

  const base =
    "relative inline-flex items-center gap-2 rounded-full font-display font-semibold transition-colors duration-300 will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500 focus-visible:outline-offset-2 outline-none";
  const sizeClasses = size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";
  const variantClasses = {
    primary: "bg-gradient-to-r from-violet to-cyan text-void",
    secondary: "glass text-foam hover:bg-white/10",
    ghost: "text-foam-dim hover:text-foam",
  }[variant];

  const classes = cn(base, sizeClasses, variantClasses, className);
  const initialStyle = variant === "primary" ? { boxShadow: PRIMARY_GLOW_A } : undefined;

  const content = (
    <>
      {children}
      {showArrow && (
        <span ref={arrowRef} className="inline-flex">
          <ArrowRight className="size-4" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        style={initialStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor-hover
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      style={initialStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      className={classes}
    >
      {content}
    </button>
  );
}
