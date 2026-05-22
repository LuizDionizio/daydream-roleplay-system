/**
 * Responsável pelos efeitos atmosféricos e profundidade visual do Board.
 * Controla vinhetas e camadas cinematográficas da viewport.
 */

import { memo } from "react";

function BoardAtmosphereLayerComponent() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-30
        bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.55))]
      "
    />
  );
}

export const BoardAtmosphereLayer = memo(BoardAtmosphereLayerComponent);

BoardAtmosphereLayer.displayName = "BoardAtmosphereLayer";
