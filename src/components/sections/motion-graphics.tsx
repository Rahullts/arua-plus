import { useRef } from "react";
import { motion } from "motion/react";
import { Music, Headphones, Radio, Disc3 } from "lucide-react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import MagicRings from "@/components/effects/MagicRings";

// Static positions around the beam — no rotation, just gentle glow pulse.
const STATIC_ICONS = [
  { Icon: Headphones, color: "#22d3ee", top: "14%", left: "50%" },
  { Icon: Music, color: "#a78bfa", top: "50%", left: "10%" },
  { Icon: Disc3, color: "#ec4899", top: "50%", left: "90%" },
  { Icon: Radio, color: "#a78bfa", top: "86%", left: "50%" },
];

export default function MotionGraphics() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const revealImgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    }
  };
  const handleMouseLeave = () => {
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty("--mx", "-9999px");
      el.style.setProperty("--my", "-9999px");
    }
  };

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center mb-14">
        <p className="eyebrow mb-4">Move to feel it</p>
        <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
          Sound has <span className="text-shimmer">texture</span>
        </h2>
        <p className="mt-4 text-foam-dim">
          A living beam of light — drift your cursor across it and watch the fog tilt with you.
        </p>
      </RevealOnScroll>

      <div
        ref={wrapRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor-hover
        className="relative mx-auto max-w-5xl mx-6 lg:mx-auto h-[560px] rounded-[2.5rem] overflow-hidden"
        style={{
          backgroundColor: "#0a0612",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 40px 100px -40px rgba(167,139,250,0.35), 0 0 0 1px rgba(255,255,255,0.02) inset",
        }}
      >
        <MagicRings
          color="#a78bfa"
          colorTwo="#22d3ee"
          ringCount={7}
          speed={0.8}
          attenuation={9}
          lineThickness={2}
          baseRadius={0.32}
          radiusStep={0.085}
          scaleRate={0.12}
          opacity={1}
          blur={0}
          noiseAmount={0.08}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.55}
          followMouse
          mouseInfluence={0.18}
          hoverScale={1.15}
          parallax={0.04}
          clickBurst
        />

        {/* Static glowing icons — no rotation */}
        <div className="absolute inset-0 pointer-events-none">
          {STATIC_ICONS.map(({ Icon, color, top, left }, i) => (
            <motion.div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 size-11 rounded-full glass flex items-center justify-center"
              style={{ top, left, border: `1px solid ${color}55` }}
              animate={{
                boxShadow: [
                  `0 0 10px ${color}55, inset 0 0 8px ${color}22`,
                  `0 0 22px ${color}aa, inset 0 0 14px ${color}55`,
                  `0 0 10px ${color}55, inset 0 0 8px ${color}22`,
                ],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            >
              <Icon className="size-4" style={{ color }} />
            </motion.div>
          ))}
        </div>

        {/* Center content panel — flex-centered, no conflicting transforms */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="w-full max-w-[34rem] mx-auto">
            <p
              className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ color: "#c4b5fd" }}
            >
              Live Signal · 432 Hz
            </p>
            <h3 className="font-display text-2xl lg:text-3xl font-semibold text-foam leading-tight">
              The room remembers the rhythm.
            </h3>
            <p className="mt-4 text-foam-dim text-sm lg:text-base mx-auto max-w-md">
              Move your cursor across the beam — fog drifts, wisps follow, the light breathes with
              you.
            </p>
          </div>
        </div>

        {/* Mouse-reactive reveal overlay */}
        <div
          ref={revealImgRef}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 5,
            mixBlendMode: "lighten",
            opacity: 0.55,
            background:
              "radial-gradient(circle at 50% 50%, rgba(244,114,182,0.6), rgba(167,139,250,0.35) 40%, transparent 70%)",
            ["--mx" as never]: "-9999px",
            ["--my" as never]: "-9999px",
            WebkitMaskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
            maskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
      </div>

      <p className="text-center text-xs text-foam-faint mt-5 font-mono tracking-widest">
        MOVE YOUR CURSOR — THE BEAM RESPONDS
      </p>
    </section>
  );
}
