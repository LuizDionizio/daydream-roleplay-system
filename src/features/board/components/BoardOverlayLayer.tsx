/**
 * Responsável pelas camadas de interface sobre o Board.
 * Futuramente conterá seleção, tooltips, cursores e overlays interativos.
 */
import { memo } from "react";

function BoardOverlayLayerComponent() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
      "
    >
      {/* FUTURE OVERLAYS */}
    </div>
  );
}
export const BoardOverlayLayer = memo(BoardOverlayLayerComponent);
BoardOverlayLayer.displayName = "BoardOverlayLayer";
