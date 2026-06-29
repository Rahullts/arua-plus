import { motion } from "motion/react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { Play, SkipBack, SkipForward, Heart, Volume2 } from "lucide-react";

const PLAYLIST_CARDS = [
  { title: "Midnight Drive", tracks: 24, colors: ["#7c3aed", "#ec4899"], mood: "🌙" },
  { title: "Deep Focus", tracks: 38, colors: ["#22d3ee", "#7c3aed"], mood: "🎯" },
  { title: "Sunday Slow", tracks: 16, colors: ["#ec4899", "#22d3ee"], mood: "☀️" },
  { title: "Electric Night", tracks: 31, colors: ["#39ff14", "#0099ff"], mood: "⚡" },
];

const EQ_COLORS = [
  "#7c3aed",
  "#a78bfa",
  "#22d3ee",
  "#0099ff",
  "#ec4899",
  "#f43f5e",
  "#39ff14",
  "#ffd600",
];

export default function AppPreview() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 25% 40%, rgba(34,211,238,0.14), transparent 55%)",
            "radial-gradient(circle at 25% 40%, rgba(124,58,237,0.14), transparent 55%)",
            "radial-gradient(circle at 25% 40%, rgba(34,211,238,0.14), transparent 55%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0 -z-10"
      />

      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <RevealOnScroll>
          <p className="eyebrow-rainbow mb-4">In your pocket</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Designed to disappear into <span className="text-shimmer">the moment</span>
          </h2>
          <p className="text-foam-dim leading-relaxed mb-8 max-w-md">
            One clean player, equalizer visuals that actually react to the track, and playlists that
            feel like they were made for exactly this afternoon.
          </p>

          <div className="space-y-3 max-w-sm">
            {PLAYLIST_CARDS.map((pl, i) => (
              <motion.div
                key={pl.title}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 6, scale: 1.02 }}
                data-cursor-hover
                className="flex items-center gap-4 glass rounded-2xl p-3 cursor-pointer"
                style={{
                  border: `1px solid ${pl.colors[0]}20`,
                }}
              >
                {/* Animated album art */}
                <motion.div
                  animate={{
                    background: [
                      `linear-gradient(135deg, ${pl.colors[0]}, ${pl.colors[1]})`,
                      `linear-gradient(225deg, ${pl.colors[0]}, ${pl.colors[1]})`,
                      `linear-gradient(315deg, ${pl.colors[0]}, ${pl.colors[1]})`,
                      `linear-gradient(135deg, ${pl.colors[0]}, ${pl.colors[1]})`,
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="size-12 rounded-xl shrink-0 flex items-center justify-center text-lg"
                >
                  {pl.mood}
                </motion.div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foam">{pl.title}</p>
                  <p className="font-mono text-xs text-foam-faint">{pl.tracks} tracks</p>
                </div>
                {/* Mini EQ indicator */}
                <div className="flex items-end gap-[2px] h-4">
                  {[1, 2, 3].map((b) => (
                    <motion.span
                      key={b}
                      className="w-[2px] rounded-full"
                      style={{ background: pl.colors[0] }}
                      animate={{
                        height: [`${20 + b * 20}%`, `${60 + b * 15}%`, `${20 + b * 20}%`],
                      }}
                      transition={{
                        duration: 0.8 + b * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.15 + b * 0.1,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll y={60} className="flex justify-center">
          {/* Phone mockup */}
          <div
            className="relative w-[300px] h-[620px] rounded-[2.75rem] p-[2px] shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
            style={{
              background: "linear-gradient(135deg, #7c3aed40, #22d3ee30, #ec489930)",
            }}
          >
            <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden bg-gradient-to-b from-surface to-void p-5 flex flex-col glass-strong">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 rounded-b-2xl bg-void z-10" />

              <p className="font-mono text-[10px] text-foam-faint text-center mt-7 mb-1 tracking-widest">
                NOW PLAYING
              </p>

              {/* Album art with rainbow glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)",
                    "0 0 40px rgba(34,211,238,0.5), 0 0 80px rgba(34,211,238,0.2)",
                    "0 0 40px rgba(236,72,153,0.5), 0 0 80px rgba(236,72,153,0.2)",
                    "0 0 40px rgba(57,255,20,0.4), 0 0 80px rgba(57,255,20,0.2)",
                    "0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)",
                  ],
                  background: [
                    "radial-gradient(circle at 30% 30%, #a78bfa, #7c3aed 45%, #14101f 80%)",
                    "radial-gradient(circle at 30% 30%, #22d3ee, #0099ff 45%, #14101f 80%)",
                    "radial-gradient(circle at 30% 30%, #ec4899, #7c3aed 45%, #14101f 80%)",
                    "radial-gradient(circle at 30% 30%, #39ff14, #22d3ee 45%, #14101f 80%)",
                    "radial-gradient(circle at 30% 30%, #a78bfa, #7c3aed 45%, #14101f 80%)",
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto mt-4 size-44 rounded-2xl"
              />

              <div className="mt-5 text-center">
                <p className="font-display font-semibold text-foam">Aurora Skyline</p>
                <p className="text-xs text-foam-faint mt-0.5">Nova Reyes</p>
              </div>

              {/* Progress bar */}
              <div className="mt-5 px-2">
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "62%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    style={{
                      background: "linear-gradient(90deg, #7c3aed, #22d3ee, #ec4899)",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1.5 font-mono text-[10px] text-foam-faint">
                  <span>1:48</span>
                  <span>2:54</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mt-5">
                <SkipBack className="size-5 text-foam-dim" />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    background: [
                      "linear-gradient(135deg, #7c3aed, #22d3ee)",
                      "linear-gradient(135deg, #22d3ee, #ec4899)",
                      "linear-gradient(135deg, #ec4899, #39ff14)",
                      "linear-gradient(135deg, #39ff14, #7c3aed)",
                      "linear-gradient(135deg, #7c3aed, #22d3ee)",
                    ],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="size-13 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ width: 52, height: 52 }}
                >
                  <Play className="size-5 text-void fill-void" />
                </motion.div>
                <SkipForward className="size-5 text-foam-dim" />
              </div>

              {/* Full-color animated equalizer */}
              <div className="flex items-end justify-center gap-[3px] h-12 mt-5">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="rounded-full"
                    style={{
                      width: "3px",
                      background: `linear-gradient(to top, ${EQ_COLORS[i % EQ_COLORS.length]}80, ${EQ_COLORS[(i + 2) % EQ_COLORS.length]})`,
                    }}
                    animate={{
                      height: [
                        `${15 + (i % 5) * 12}%`,
                        `${35 + ((i + 2) % 6) * 11}%`,
                        `${20 + (i % 4) * 14}%`,
                        `${15 + (i % 5) * 12}%`,
                      ],
                    }}
                    transition={{
                      duration: 0.9 + (i % 4) * 0.18,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.035,
                    }}
                  />
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between px-1 pb-1">
                <span className="font-mono text-[10px] text-foam-faint">UP NEXT · 3 SONGS</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="size-4 text-pink fill-pink" />
                </motion.div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
