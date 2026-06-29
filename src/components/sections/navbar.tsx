import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import MagneticButton from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Experience", href: "#experience" },
  { label: "Artists", href: "#artists" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when a link is clicked
  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-3 backdrop-blur-xl bg-void/70 border-b border-white/[0.06]"
          : "py-6 bg-transparent",
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between">
        <a
          href="#top"
          data-cursor-hover
          className="font-display text-xl font-bold tracking-tight text-foam"
        >
          Arua<span className="text-gradient">+</span>
        </a>

        <ul className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                data-cursor-hover
                onClick={() => handleLinkClick(link.href)}
                className="text-sm font-medium text-foam-dim hover:text-foam transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500 focus-visible:outline-offset-2 outline-none"
              >
                {link.label}
              </a>
              {activeLink === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-violet via-cyan to-pink rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <MagneticButton size="default">Get Started</MagneticButton>
        </div>

        <button
          data-cursor-hover
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-foam focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500 focus-visible:outline-offset-2 outline-none"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-void/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="block py-3 text-base font-medium text-foam-dim hover:text-foam transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500 focus-visible:outline-offset-2 outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <MagneticButton size="default" className="w-full justify-center">
                  Get Started
                </MagneticButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
