import { motion } from "motion/react";
import { Star } from "lucide-react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

const TESTIMONIALS = [
  {
    name: "Aarav Mehta",
    role: "Sound Design Student",
    review:
      "The mood mixes actually shift with how I'm feeling, not just what I clicked last. It's the first app that's felt like it's paying attention.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Late-Night Coder",
    review:
      "Spatial audio on headphones genuinely changed how I listen. Tracks I've heard a hundred times suddenly have corners I hadn't noticed.",
    rating: 5,
  },
  {
    name: "Devika Rao",
    role: "Playlist Curator",
    review:
      "Collaborative playlists with friends across three cities, live, with zero lag. Small feature, huge difference for how we actually use it.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32 lg:py-40">
      <RevealOnScroll className="mx-auto max-w-2xl px-6 text-center mb-16">
        <p className="eyebrow mb-4">From early listeners</p>
        <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
          People notice the difference
        </h2>
      </RevealOnScroll>

      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl p-7 flex flex-col"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`size-4 ${
                    idx < t.rating ? "text-cyan fill-cyan" : "text-white/15 fill-white/15"
                  }`}
                />
              ))}
            </div>
            <p className="text-foam-dim leading-relaxed flex-1">&ldquo;{t.review}&rdquo;</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-violet-soft to-cyan shrink-0" />
              <div>
                <p className="text-sm font-medium text-foam">{t.name}</p>
                <p className="text-xs text-foam-faint">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
