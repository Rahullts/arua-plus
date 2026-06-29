declare module "@/components/effects/LaserFlow" {
  import { CSSProperties, FC } from "react";
  export interface LaserFlowProps {
    className?: string;
    style?: CSSProperties;
    wispDensity?: number;
    dpr?: number;
    /** Hard ceiling for device pixel ratio (default 2). */
    maxDpr?: number;
    /** Quality preset: caps DPR. 'auto' starts high and steps down on sustained low FPS. */
    quality?: "low" | "medium" | "high" | "ultra" | "auto";
    /** Throttle render loop to this FPS. 0 = uncapped (default). */
    fpsCap?: number;
    mouseSmoothTime?: number;
    mouseTiltStrength?: number;
    horizontalBeamOffset?: number;
    verticalBeamOffset?: number;
    flowSpeed?: number;
    verticalSizing?: number;
    horizontalSizing?: number;
    fogIntensity?: number;
    fogScale?: number;
    wispSpeed?: number;
    wispIntensity?: number;
    flowStrength?: number;
    decay?: number;
    falloffStart?: number;
    fogFallSpeed?: number;
    color?: string;
  }
  const LaserFlow: FC<LaserFlowProps>;
  export default LaserFlow;
  export { LaserFlow };
}
