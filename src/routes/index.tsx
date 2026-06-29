import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import MusicExperience from "@/components/sections/music-experience";
import FeatureBento from "@/components/sections/feature-bento";
import AppPreview from "@/components/sections/app-preview";
import ArtistDiscovery from "@/components/sections/artist-discovery";
import MotionGraphics from "@/components/sections/motion-graphics";
import Pricing from "@/components/sections/pricing";
import Testimonials from "@/components/sections/testimonials";
import FAQ from "@/components/sections/faq";
import FinalCTA from "@/components/sections/final-cta";
import Footer from "@/components/sections/footer";
import GrainOverlay from "@/components/effects/grain-overlay";
import SoftAurora from "@/components/effects/SoftAurora";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arua+ — Feel every beat before it plays." },
      {
        name: "description",
        content:
          "A next-generation music app that blends personalized sound, immersive visuals, and mood-based discovery.",
      },
      { property: "og:title", content: "Arua+ — Feel every beat before it plays." },
      {
        property: "og:description",
        content:
          "A next-generation music app that blends personalized sound, immersive visuals, and mood-based discovery.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Global animated aurora — sits behind everything, real moving WebGL */}
      <div
        aria-hidden
        className="fixed inset-0 -z-50 pointer-events-none"
        style={{ background: "#04030a" }}
      >
        <div className="absolute inset-0 opacity-60">
          <SoftAurora
            speed={0.35}
            scale={1.8}
            brightness={0.9}
            color1="#7c3aed"
            color2="#22d3ee"
            bandHeight={0.55}
            bandSpread={0.9}
            colorSpeed={0.6}
            enableMouseInteraction={false}
          />
        </div>
        {/* Subtle vertical fade so content stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,3,10,0.35) 0%, rgba(4,3,10,0.15) 40%, rgba(4,3,10,0.55) 100%)",
          }}
        />
      </div>

      <GrainOverlay />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MusicExperience />
        <FeatureBento />
        <AppPreview />
        <ArtistDiscovery />
        <MotionGraphics />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
