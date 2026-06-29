import { motion } from "motion/react";
import MagneticButton from "@/components/ui/magnetic-button";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import WaveformDivider from "@/components/effects/waveform-divider";

export default function FinalCTA() {
  return (
    <section className="relative py-36 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void-alt to-void" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[60vh] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.3),transparent_65%)]" />
      </div>

      {/* Floating waveform particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-violet-soft to-cyan opacity-30"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            left: `${8 + i * 11}%`,
            top: `${20 + (i % 4) * 18}%`,
          }}
          animate={{ y: [0, -24, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      <RevealOnScroll className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
          Your next favorite song
          <br />
          is already{" "}
          <span className="text-gradient">
            listening <span className="whitespace-nowrap">for you.</span>
          </span>
        </h2>
        <p className="mt-6 text-lg text-foam-dim max-w-xl mx-auto">
          Start free. No card required. Cancel in two taps, whenever.
        </p>
        <div className="mt-10 flex justify-center">
          <MagneticButton size="lg" showArrow>
            Start Listening Free
          </MagneticButton>
        </div>
        <p className="mt-6 text-sm font-medium text-foam-faint flex items-center justify-center gap-2">
          Joined by 2.4M listeners
        </p>

        <div className="mt-16 max-w-xl mx-auto">
          <WaveformDivider amplitude={20} />
        </div>
      </RevealOnScroll>
    </section>
  );
}
