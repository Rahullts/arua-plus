import { AtSign, MessageCircle, Play as PlayCircle, Send } from "lucide-react";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

const LINK_COLUMNS = [
  {
    heading: "Product",
    links: ["Features", "Experience", "Pricing", "Download"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Press", "Blog"],
  },
  {
    heading: "Support",
    links: ["Help Center", "Contact", "Privacy", "Terms"],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] pt-20 pb-10">
      <RevealOnScroll y={20} blur={false} className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <span className="font-display text-xl font-bold tracking-tight">
              Arua<span className="text-gradient">+</span>
            </span>
            <p className="mt-4 text-sm text-foam-dim max-w-xs leading-relaxed">
              A next-generation music app that blends personalized sound, immersive visuals, and
              mood-based discovery.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[AtSign, MessageCircle, PlayCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-cursor-hover
                  aria-label="Social link"
                  className="size-9 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Icon className="size-4 text-foam-dim" />
                </a>
              ))}
            </div>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="font-display text-sm font-semibold text-foam mb-4">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      data-cursor-hover
                      className="text-sm text-foam-dim hover:text-foam transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-sm font-semibold text-foam mb-4">Stay in the flow</h4>
            <p className="text-sm text-foam-dim mb-4">
              New artists and features, once a month, no noise.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 min-w-0 rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-foam placeholder:text-foam-faint focus:outline-none focus:border-cyan/50"
              />
              <button
                type="submit"
                data-cursor-hover
                aria-label="Subscribe"
                className="shrink-0 size-10 rounded-full bg-gradient-to-r from-violet to-cyan flex items-center justify-center"
              >
                <Send className="size-4 text-void" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foam-faint">
          <span>© 2026 Arua+. All rights reserved.</span>
          <span className="font-mono">Made for listeners, not algorithms.</span>
        </div>
      </RevealOnScroll>
    </footer>
  );
}
