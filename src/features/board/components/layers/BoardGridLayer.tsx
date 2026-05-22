/**
 * Responsável pela renderização do grid espacial do Board.
 * Define leitura tática e alinhamento visual do mundo.
 */

import { memo } from "react";

function BoardGridLayerComponent() {
  return (
    <div
      className="
        absolute
        inset-0
        z-10
        opacity-[0.12]
      "
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px),

          linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: `
          64px 64px,
          64px 64px,
          16px 16px,
          16px 16px
        `,
      }}
    />
  );
}

export const BoardGridLayer = memo(BoardGridLayerComponent);

BoardGridLayer.displayName = "BoardGridLayer";
