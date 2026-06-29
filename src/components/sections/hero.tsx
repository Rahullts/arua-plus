import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "motion/react";
import MagneticButton from "@/components/ui/magnetic-button";
import SoftAurora from "@/components/effects/SoftAurora";
import { Play, Music, Headphones, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURE_PILLS = [
  { label: "AI Mood Mix", icon: Music, side: "left", top: "28%", isLive: false },
  { label: "Live Lyrics", icon: Radio, side: "right", top: "22%", isLive: true },
  { label: "Spatial Audio", icon: Headphones, side: "left", top: "62%", isLive: true },
];

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 48, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.0,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.4,
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20"
    >
      {/* SoftAurora — hero background visual */}
      <div className="absolute inset-0 -z-10">
        <SoftAurora
          speed={0.55}
          scale={1.6}
          brightness={1.1}
          color1="#a78bfa"
          color2="#22d3ee"
          bandHeight={0.5}
          bandSpread={1.1}
          colorSpeed={1.0}
          mouseInfluence={0.2}
        />
      </div>

      {/* Vignette so headline stays legible over the beam */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(4,3,10,0.10) 0%, rgba(4,3,10,0.55) 55%, rgba(4,3,10,0.9) 100%)",
        }}
      />

      {/* Feature pills */}
      {FEATURE_PILLS.map((pill, i) => {
        const Icon = pill.icon;
        return (
          <motion.div
            key={pill.label}
            initial={{ opacity: 0, x: pill.side === "left" ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.4 + i * 0.15, ease: "easeOut" }}
            className={`hidden lg:flex absolute items-center gap-2.5 glass rounded-full px-4 py-2.5
              ${pill.side === "left" ? "left-[4%]" : "right-[4%]"}`}
            style={{ top: pill.top }}
          >
            <span
              className={cn("size-2 rounded-full", pill.isLive && "animate-pulse")}
              style={{
                background: pill.isLive ? "#22d3ee" : "#a78bfa",
                boxShadow: `0 0 8px ${pill.isLive ? "#22d3ee" : "#a78bfa"}`,
              }}
            />
            <Icon
              className="size-3.5"
              strokeWidth={1.5}
              style={{ color: pill.isLive ? "#22d3ee" : "#a78bfa" }}
            />
            <span className="text-xs font-medium text-foam/80 tracking-wide">{pill.label}</span>
          </motion.div>
        );
      })}

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full glass"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="size-1.5 rounded-full bg-cyan"
          />
          <span className="eyebrow">Now in early access</span>
        </motion.div>

        <h1
          ref={headlineRef}
          className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight"
          style={{ perspective: "700px" }}
        >
          {`Feel every beat before it plays.`.split(" ").map((word, i) => (
            <span key={i} className="word inline-block mr-[0.22em]">
              {word === "beat" ? <span className="text-shimmer">{word}</span> : word}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="mt-7 max-w-xl mx-auto text-base lg:text-lg text-foam-dim leading-relaxed"
        >
          A next-generation music platform that blends personalized sound, reactive visuals, and
          mood-based discovery — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <MagneticButton size="lg" showArrow>
            Start Listening
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary">
            <Play className="size-4" />
            Watch Demo
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-14 flex items-center justify-center gap-10 flex-wrap"
        >
          {[
            { value: "2.4M", label: "Active listeners", color: "#22d3ee" },
            { value: "80M+", label: "Tracks available", color: "#a78bfa" },
            { value: "12M", label: "AI playlists", color: "#34d399" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="font-display text-2xl font-bold tabular-nums"
                style={{ color: s.color }}
              >
                {s.value}
              </p>
              <p className="text-xs text-foam-faint font-mono mt-0.5 tracking-widest uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
