/**
 * Responsável pela composição visual das layers do mundo do Board.
 * Organiza terreno, grid, entidades e atmosfera da viewport.
 */

import { memo } from "react";

import { BoardAtmosphereLayer } from "./layers/BoardAtmosphereLayer";
import { BoardEntityLayer } from "./layers/BoardEntityLayer";
import { BoardGridLayer } from "./layers/BoardGridLayer";
import { BoardTerrainLayer } from "./layers/BoardTerrainLayer";

import type { BoardTokenData } from "../types/board";

type BoardCanvasLayerProps = {
  tokens: BoardTokenData[];

  selectedTokenId: string | null;

  cameraZoom: number;

  onSelectToken: (id: string | null) => void;

  onMoveToken: (tokenId: string, x: number, y: number) => void;
};

function BoardCanvasLayerComponent({
  tokens,
  selectedTokenId,
  cameraZoom,
  onSelectToken,
  onMoveToken,
}: BoardCanvasLayerProps) {
  return (
    <div
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
      "
    >
      <div
        onMouseDown={() => {
          onSelectToken(null);
        }}
        className="
          relative
          h-550
          w-550
          overflow-hidden
          rounded-[40px]
          border
          border-zinc-800
          bg-[#0f0f10]
          shadow-2xl
        "
      >
        <BoardTerrainLayer />

        <BoardGridLayer />

        <BoardEntityLayer
          tokens={tokens}
          selectedTokenId={selectedTokenId}
          cameraZoom={cameraZoom}
          onSelectToken={onSelectToken}
          onMoveToken={onMoveToken}
        />

        <BoardAtmosphereLayer />
      </div>
    </div>
  );
}

export const BoardCanvasLayer = memo(BoardCanvasLayerComponent);

BoardCanvasLayer.displayName = "BoardCanvasLayer";
