/**
 * Responsável pela renderização visual da superfície base do mundo.
 * Controla atmosfera, profundidade e aparência do terreno do Board.
 */

import { memo } from "react";

function BoardTerrainLayerComponent() {
  return (
    <div
      className="
        absolute
        inset-0
        z-0
        bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]
      "
    />
  );
}

export const BoardTerrainLayer = memo(BoardTerrainLayerComponent);
BoardTerrainLayer.displayName = "BoardTerrainLayer";
