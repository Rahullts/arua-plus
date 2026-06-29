import { motion } from "motion/react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Mic2, Wand2, Headphones, Download, Compass, Users, Moon } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Mood Playlists",
    body: "Mixes that update as your day does — calmer in the morning, sharper before a deadline.",
    span: "lg:col-span-2 lg:row-span-2",
    color: "#a78bfa",
    gradient: "from-violet/30 via-indigo/20 to-cyan/15",
    glowColor: "rgba(124,58,237,0.4)",
    accent: "#7c3aed",
  },
  {
    icon: Mic2,
    title: "Real-Time Lyrics",
    body: "Word-perfect lyrics that scroll in time, even on tracks released this week.",
    span: "",
    color: "#22d3ee",
    gradient: "from-cyan/25 via-laser-blue/15 to-violet/10",
    glowColor: "rgba(34,211,238,0.4)",
    accent: "#22d3ee",
  },
  {
    icon: Wand2,
    title: "Smart Recommendations",
    body: "Suggestions that get sharper the more you skip, save, and replay.",
    span: "",
    color: "#ec4899",
    gradient: "from-pink/25 via-coral/15 to-violet/10",
    glowColor: "rgba(236,72,153,0.4)",
    accent: "#ec4899",
  },
  {
    icon: Headphones,
    title: "Spatial Audio",
    body: "Mixed in 3D space, not just stereo — sound that moves around you.",
    span: "lg:row-span-2",
    color: "#39ff14",
    gradient: "from-neon-green/20 via-mint/15 to-cyan/10",
    glowColor: "rgba(57,255,20,0.35)",
    accent: "#39ff14",
  },
  {
    icon: Download,
    title: "Offline Listening",
    body: "Your whole flow, downloaded, for the exact moments you lose signal.",
    span: "",
    color: "#ffd600",
    gradient: "from-hot-yellow/25 via-electric-orange/15 to-pink/10",
    glowColor: "rgba(255,214,0,0.4)",
    accent: "#ffd600",
  },
  {
    icon: Compass,
    title: "Artist Discovery",
    body: "New acts surfaced from your taste, not from what's already viral.",
    span: "",
    color: "#ff6b00",
    gradient: "from-electric-orange/25 via-coral/15 to-pink/10",
    glowColor: "rgba(255,107,0,0.4)",
    accent: "#ff6b00",
  },
  {
    icon: Users,
    title: "Collaborative Playlists",
    body: "Build a queue together, live, from different rooms and different cities.",
    span: "lg:col-span-2",
    color: "#00ffa3",
    gradient: "from-mint/25 via-cyan/15 to-laser-blue/10",
    glowColor: "rgba(0,255,163,0.35)",
    accent: "#00ffa3",
  },
  {
    icon: Moon,
    title: "Sleep Timer",
    body: "Fades out exactly when you do — no jarring silence, no 3 a.m. wake-up.",
    span: "",
    color: "#4f46e5",
    gradient: "from-indigo/25 via-violet/15 to-pink/10",
    glowColor: "rgba(79,70,229,0.4)",
    accent: "#4f46e5",
  },
];

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(hover: none)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    setHovered(false);
  };

  const handleMouseEnter = () => setHovered(true);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileHover={{ scale: 1.03 }}
      data-cursor-hover
      className={cn("group relative glass rounded-3xl p-7 overflow-hidden", feature.span)}
      style={{
        transition: "transform 0.22s ease-out, box-shadow 0.3s ease-out",
        boxShadow: hovered ? `0 0 40px ${feature.glowColor}, 0 20px 60px rgba(0,0,0,0.4)` : "none",
      }}
    >
      {/* Animated gradient fill on hover */}
      <motion.div
        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${feature.gradient}`}
      />

      {/* Neon border on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{
          boxShadow: hovered ? `inset 0 0 0 1px ${feature.color}60` : "none",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Sparkle particles on hover */}
      {hovered &&
        Array.from({ length: 5 }).map((_, pi) => (
          <motion.div
            key={pi}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 4,
              height: 4,
              background: feature.color,
              boxShadow: `0 0 8px ${feature.color}`,
              left: `${20 + pi * 15}%`,
              bottom: "10%",
            }}
            animate={{
              y: [-0, -60],
              opacity: [1, 0],
              x: [(pi - 2) * 8, (pi - 2) * 20],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: pi * 0.15,
            }}
          />
        ))}

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon with glow */}
        <motion.div
          animate={{
            boxShadow: hovered
              ? `0 0 20px ${feature.glowColor}, 0 0 40px ${feature.glowColor}60`
              : "none",
          }}
          className="size-13 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/12 flex items-center justify-center mb-5 group-hover:scale-115 transition-transform duration-300"
          style={{
            width: 52,
            height: 52,
          }}
        >
          <Icon className="size-5" style={{ color: feature.color }} />
        </motion.div>

        <h3
          className="font-display text-lg font-semibold mb-2"
          style={{ color: hovered ? feature.color : undefined, transition: "color 0.3s" }}
        >
          {feature.title}
        </h3>
        <p className="text-sm text-foam-dim leading-relaxed">{feature.body}</p>

        {/* Animated waveform bars at bottom */}
        <div className="mt-auto pt-6 flex items-end gap-[3px] h-8 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              className="rounded-full"
              style={{
                width: "3px",
                background: `linear-gradient(to top, ${feature.accent}88, ${feature.color})`,
                boxShadow: hovered ? `0 0 4px ${feature.color}` : "none",
              }}
              animate={{
                height: [
                  `${20 + Math.abs(Math.sin(i * 0.8)) * 75}%`,
                  `${10 + Math.abs(Math.sin((i + 3) * 0.9)) * 85}%`,
                  `${20 + Math.abs(Math.sin(i * 0.8)) * 75}%`,
                ],
              }}
              transition={{
                duration: 1.5 + (i % 5) * 0.18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.06,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeatureBento() {
  return (
    <section id="features" className="relative py-32 lg:py-40">
      {/* Subtle multi-color background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #7c3aed, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #22d3ee, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center mb-16">
        <p className="eyebrow-rainbow mb-4">Everything, tuned</p>
        <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
          Built for how you actually <span className="text-shimmer">listen</span>
        </h2>
      </div>

      <RevealOnScroll
        className="mx-auto max-w-6xl px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[200px]"
        staggerChildren
        stagger={0.07}
      >
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </RevealOnScroll>
    </section>
  );
}
