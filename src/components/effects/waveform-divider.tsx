import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth curved waveform that:
 *  1. Draws in once when it scrolls into view (stroke-dashoffset).
 *  2. After draw-in, loops a gentle bob/flow like a real audio visualizer.
 */
export default function WaveformDivider({
  className,
  amplitude = 14,
}: {
  className?: string;
  amplitude?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Build a SMOOTH curve via cubic-bezier interpolation across pseudo-random points.
  const width = 1200;
  const midY = 24;
  const COUNT = 14;
  const points = Array.from({ length: COUNT }, (_, i) => {
    const seed = Math.sin(i * 12.9898) * 43758.5453;
    const frac = seed - Math.floor(seed);
    return {
      x: (i / (COUNT - 1)) * width,
      y: midY + (frac * amplitude - amplitude / 2),
    };
  });

  const buildPath = (offset: number) => {
    const pts = points.map((p, i) => ({
      x: p.x,
      y:
        p.y +
        Math.sin(i * 0.9 + offset) * (amplitude * 0.35) +
        Math.cos(i * 0.4 + offset * 0.7) * (amplitude * 0.2),
    }));
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cx = (p0.x + p1.x) / 2;
      d += ` Q ${cx} ${p0.y}, ${cx} ${(p0.y + p1.y) / 2} T ${p1.x} ${p1.y}`;
    }
    return d;
  };

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const loopState = { t: 0 };
    let loopTween: gsap.core.Tween | null = null;

    const trigger = ScrollTrigger.create({
      trigger: svg,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.out",
          onComplete: () => {
            loopTween = gsap.to(loopState, {
              t: Math.PI * 2,
              duration: 4.5,
              repeat: -1,
              ease: "none",
              onUpdate: () => {
                path.setAttribute("d", buildPath(loopState.t));
              },
            });
          },
        });
      },
    });

    return () => {
      trigger.kill();
      loopTween?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude]);

  return (
    <svg
      ref={svgRef}
      className={cn("waveform-divider", className)}
      viewBox={`0 0 ${width} 48`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
          <stop offset="20%" stopColor="#7c3aed" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
          <stop offset="80%" stopColor="#ec4899" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d={buildPath(0)}
        fill="none"
        stroke="url(#waveGradient)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
