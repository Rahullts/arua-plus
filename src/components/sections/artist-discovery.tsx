import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";
import { UserPlus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ARTISTS = [
  { name: "Nova Reyes", genre: "Synth Pop", listeners: "4.2M", gradient: "from-violet to-pink" },
  { name: "Echo Marlin", genre: "Lo-fi", listeners: "2.8M", gradient: "from-cyan to-violet" },
  { name: "Kira Vance", genre: "Indie Folk", listeners: "1.9M", gradient: "from-pink to-cyan" },
  {
    name: "The Drift",
    genre: "Ambient",
    listeners: "3.1M",
    gradient: "from-violet-soft to-violet",
  },
  { name: "Juno Park", genre: "R&B", listeners: "5.6M", gradient: "from-cyan to-pink" },
  { name: "Static Bloom", genre: "Dream Pop", listeners: "1.4M", gradient: "from-pink to-violet" },
];

function ArtistCard({ artist }: { artist: (typeof ARTISTS)[number] }) {
  const [following, setFollowing] = useState(false);

  return (
    <div
      data-cursor-hover
      className="artist-card group relative shrink-0 w-[260px] glass rounded-3xl p-6 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(124,58,237,0.3)] transition-all duration-400"
    >
      <div
        className={cn("size-28 rounded-2xl bg-gradient-to-br mb-5 shadow-lg", artist.gradient)}
      />
      <h3 className="font-display text-lg font-semibold">{artist.name}</h3>
      <p className="text-sm text-foam-dim mt-1">{artist.genre}</p>
      <p className="font-mono text-xs text-foam-faint mt-3">{artist.listeners} monthly listeners</p>

      <button
        onClick={() => setFollowing((v) => !v)}
        data-cursor-hover
        className={cn(
          "mt-5 w-full flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition-colors duration-300",
          following ? "bg-white/10 text-foam" : "bg-gradient-to-r from-violet to-cyan text-void",
        )}
      >
        {following ? (
          <>
            <Check className="size-4" /> Following
          </>
        ) : (
          <>
            <UserPlus className="size-4" /> Follow
          </>
        )}
      </button>
    </div>
  );
}

export default function ArtistDiscovery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const scrollAmount = track.scrollWidth - window.innerWidth + 96;

      if (scrollAmount > 0) {
        gsap.to(track, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollAmount}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="artists" ref={sectionRef} className="relative py-32 overflow-hidden">
      <RevealOnScroll className="mx-auto max-w-3xl px-6 text-center mb-14">
        <p className="eyebrow mb-4">Artist discovery</p>
        <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
          New favorites, found early
        </h2>
      </RevealOnScroll>

      <div ref={trackRef} className="flex gap-6 px-6 lg:px-[8vw] will-change-transform">
        {ARTISTS.map((artist) => (
          <ArtistCard key={artist.name} artist={artist} />
        ))}
      </div>
    </section>
  );
}
