declare module "@/components/effects/SoftAurora" {
  import { FC } from "react";
  export interface SoftAuroraProps {
    speed?: number;
    scale?: number;
    brightness?: number;
    color1?: string;
    color2?: string;
    noiseFrequency?: number;
    noiseAmplitude?: number;
    bandHeight?: number;
    bandSpread?: number;
    octaveDecay?: number;
    layerOffset?: number;
    colorSpeed?: number;
    enableMouseInteraction?: boolean;
    mouseInfluence?: number;
  }
  const SoftAurora: FC<SoftAuroraProps>;
  export default SoftAurora;
}
