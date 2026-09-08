import React from "react";

// Mount ONCE per page (in the root layout). Renders nothing visible: it holds the turbulence
// filters used for the hand-cut borders and hand-drawn rules. Type is NEVER filtered in this
// system. Grain is not here either: it lives inside ImagePlate and Sheet.
export function FilmLayer({ className = "" }: { className?: string }) {
  return (
    <svg width="0" height="0" className={className} style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <filter id="bm-edge-rough" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.016 0.038" numOctaves={3} seed={19} result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale={5} xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="bm-rule-wobble" x="-2%" y="-300%" width="104%" height="700%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.04" numOctaves={2} seed={31} result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale={1.5} xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="bm-edge-frayed" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.32" numOctaves={2} seed={27} result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale={2.6} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
