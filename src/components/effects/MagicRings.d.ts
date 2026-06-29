declare module "@/components/effects/MagicRings" {
  import { FC } from "react";
  export interface MagicRingsProps {
    color?: string;
    colorTwo?: string;
    ringCount?: number;
    speed?: number;
    attenuation?: number;
    lineThickness?: number;
    baseRadius?: number;
    radiusStep?: number;
    scaleRate?: number;
    opacity?: number;
    blur?: number;
    noiseAmount?: number;
    rotation?: number;
    ringGap?: number;
    fadeIn?: number;
    fadeOut?: number;
    followMouse?: boolean;
    mouseInfluence?: number;
    hoverScale?: number;
    parallax?: number;
    clickBurst?: boolean;
  }
  const MagicRings: FC<MagicRingsProps>;
  export default MagicRings;
}
