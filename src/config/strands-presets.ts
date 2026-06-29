// Per-section Strands tuning. Edit values here — no need to touch the component.
import type { StrandsProps } from "@/components/effects/Strands";

export const STRANDS_PRESETS = {
  motionGraphics: {
    colors: ["#a78bfa", "#22d3ee", "#ec4899"],
    count: 5,
    speed: 0.55,
    amplitude: 1.1,
    waviness: 1.1,
    thickness: 0.8,
    glow: 2.8,
    taper: 3,
    spread: 1,
    intensity: 0.7,
    saturation: 1.4,
    opacity: 1,
    scale: 1.5,
  },
} satisfies Record<string, StrandsProps>;

export type StrandsPresetName = keyof typeof STRANDS_PRESETS;
