import { Compass, Waves, Sparkles, Share2, Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const STEPS = [
  {
    icon: Compass,
    title: "Discover your mood",
    body: "Answer a 10-second check-in and Arua+ reads the emotional tone you're reaching for — calm, focused, electric, nostalgic.",
    color: "#a78bfa",
    soft: "#c4b5fd",
    aura: "radial-gradient(circle at 30% 30%, #a78bfa55, transparent 60%), radial-gradient(circle at 80% 70%, #6d28d955, transparent 65%)",
  },
  {
    icon: Waves,
    title: "Generate your flow",
    body: "A live mix builds itself around that mood, blending familiar favorites with tracks you haven't heard yet but were always going to love.",
    color: "#60a5fa",
    soft: "#93c5fd",
    aura: "radial-gradient(circle at 70% 30%, #60a5fa55, transparent 60%), radial-gradient(circle at 20% 80%, #1d4ed855, transparent 65%)",
  },
  {
    icon: Sparkles,
    title: "Listen with immersive visuals",
    body: "Every track arrives with reactive visuals and spatial audio tuned to the room you're in, the headphones you're wearing.",
    color: "#2dd4bf",
    soft: "#5eead4",
    aura: "radial-gradient(circle at 25% 70%, #2dd4bf55, transparent 60%), radial-gradient(circle at 80% 20%, #0d948855, transparent 65%)",
  },
  {
    icon: Share2,
    title: "Save and share playlists",
    body: "Turn any flow into a playlist in one tap, or hand it to a friend exactly as it felt the moment you made it.",
    color: "#f5b86b",
    soft: "#fcd9a8",
    aura: "radial-gradient(circle at 75% 75%, #f5b86b55, transparent 60%), radial-gradient(circle at 20% 25%, #c2410c55, transparent 65%)",
  },
];

const AUTO_MS = 5200;

export default function MusicExperience() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => setActive((p) => (p + 1) % STEPS.length), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + STEPS.length) % STEPS.length), []);
  const toggle = useCallback(() => setPaused((p) => !p), []);

  // Auto advance
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, AUTO_MS);
    return () => clearTimeout(t);
  }, [active, paused, next]);

  // Keyboard controls — active when stage is focused or hovered
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const stage = stageRef.current;
      if (!stage) return;
      // Only intercept when section is in view
      const rect = stage.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
      if (!inView) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === " " || e.key === "Enter") {
        if (document.activeElement?.tagName === "BUTTON") return;
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, toggle]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const step = STEPS[active];
  const Icon = step.icon;

  return (
    <section
      id="experience"
      className="relative py-32 lg:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-3xl px-6 text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-400/60" />
          <p className="eyebrow text-foam-faint !mb-0">How it feels</p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/60" />
        </div>
        <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-foam">
          Four steps. <span className="text-gradient">One feeling.</span>
        </h2>
        <p className="mt-5 text-foam-dim max-w-xl mx-auto leading-relaxed">
          A quiet, deliberate path from a single mood to a soundtrack that feels like it was always
          yours.
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Gradient border frame */}
        <div
          aria-hidden
          className="absolute inset-x-6 -inset-y-px rounded-[2.1rem] pointer-events-none opacity-70"
          style={{
            background: `linear-gradient(135deg, ${step.color}55, transparent 40%, ${step.soft}33)`,
            padding: "1px",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            transition: "background 0.7s ease",
          }}
        />
        {/* Slide stage */}
        <div
          ref={stageRef}
          tabIndex={0}
          role="region"
          aria-label="How it feels carousel — use arrow keys to navigate, space to play or pause"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative h-[480px] sm:h-[420px] rounded-[2rem] overflow-hidden border border-white/10 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500 focus-visible:outline-offset-2 touch-pan-y"
          style={{
            background: "linear-gradient(160deg, rgba(14,10,28,0.85), rgba(8,6,18,0.9))",
            boxShadow: `0 40px 90px -40px ${step.color}66`,
          }}
        >
          {/* Animated color aura with beat-pulse */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`aura-${active}`}
              className="absolute inset-0 pointer-events-none"
              style={{ background: step.aura, filter: "blur(20px)" }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{
                opacity: paused ? 0.7 : [0.75, 1, 0.85, 1, 0.78],
                scale: paused ? 1 : [1, 1.04, 1.01, 1.05, 1],
              }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                opacity: paused
                  ? { duration: 0.6 }
                  : { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                scale: paused
                  ? { duration: 0.6 }
                  : { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </AnimatePresence>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 z-20">
            <motion.div
              key={`bar-${active}-${paused ? "p" : "r"}`}
              className="h-full"
              style={{ background: step.color }}
              initial={{ width: "0%" }}
              animate={{ width: paused ? "0%" : "100%" }}
              transition={{ duration: paused ? 0 : AUTO_MS / 1000, ease: "linear" }}
            />
          </div>

          {/* Slide content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-14 lg:px-20"
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="shrink-0 size-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}33, ${step.color}0a)`,
                    border: `1px solid ${step.color}55`,
                    boxShadow: `inset 0 1px 0 ${step.soft}40`,
                  }}
                >
                  <Icon className="size-6" style={{ color: step.soft }} />
                </div>
                <span
                  className="font-mono text-[11px] font-medium tracking-[0.28em]"
                  style={{ color: step.soft }}
                >
                  STEP 0{active + 1} / 04
                </span>
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={paused ? "Play carousel" : "Pause carousel"}
                  className="size-8 rounded-full glass flex items-center justify-center text-foam-dim hover:text-foam transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500 focus-visible:outline-offset-2 outline-none"
                >
                  {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
                </button>
              </div>

              {/* Beat-synced waveform scaled up and placed as focal visual */}
              <div className="flex items-end gap-[4px] h-20 sm:h-24 mb-8 max-w-md">
                {Array.from({ length: 48 }).map((_, bi) => (
                  <motion.span
                    key={`${active}-${bi}`}
                    className="rounded-full"
                    style={{ width: "3px", background: step.color }}
                    animate={{
                      height: [
                        `${15 + Math.abs(Math.sin(bi * 0.5 + active)) * 55}%`,
                        `${30 + Math.abs(Math.sin(bi * 0.5 + active + 1.6)) * 70}%`,
                        `${15 + Math.abs(Math.sin(bi * 0.5 + active)) * 55}%`,
                      ],
                      opacity: [0.35, 0.85, 0.35],
                    }}
                    transition={{
                      duration: 1.6 + (bi % 5) * 0.12,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: bi * 0.02,
                    }}
                  />
                ))}
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight text-foam max-w-2xl">
                {step.title}
              </h3>

              <p className="mt-5 text-foam-dim leading-relaxed max-w-xl text-base sm:text-lg">
                {step.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step controls */}
        <div className="mt-8 grid grid-cols-4 gap-3">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.title}
                onClick={() => setActive(i)}
                aria-label={`Go to step ${i + 1}: ${s.title}`}
                className="group relative text-left rounded-2xl p-4 border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500 focus-visible:outline-offset-2 outline-none"
                style={{
                  borderColor: isActive ? `${s.color}80` : "rgba(255,255,255,0.08)",
                  background: isActive
                    ? `linear-gradient(160deg, ${s.color}1f, transparent)`
                    : "rgba(255,255,255,0.02)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="size-1.5 rounded-full transition-all"
                    style={{
                      background: s.color,
                      boxShadow: isActive ? `0 0 12px ${s.color}` : "none",
                    }}
                  />
                  <span
                    className="font-mono text-[10px] tracking-[0.25em]"
                    style={{ color: isActive ? s.soft : "rgba(255,255,255,0.4)" }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <p
                  className="text-xs sm:text-sm font-medium leading-snug transition-colors"
                  style={{ color: isActive ? "#f8fafc" : "rgba(248,250,252,0.55)" }}
                >
                  {s.title}
                </p>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[11px] font-mono tracking-[0.25em] text-foam-faint">
          ← → SWITCH · SPACE PLAY/PAUSE · SWIPE ON MOBILE
        </p>
      </div>
    </section>
  );
}
