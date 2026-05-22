/**
 * Responsável pela renderização das entidades espaciais do Board.
 * Controla tokens, criaturas e elementos interativos do mundo.
 */

import { memo } from "react";

import { BoardToken } from "../../entities/BoardToken";

import type { BoardTokenData } from "../../types/board";

type BoardEntityLayerProps = {
  tokens: BoardTokenData[];

  selectedTokenId: string | null;

  cameraZoom: number;

  onSelectToken: (id: string | null) => void;

  onMoveToken: (tokenId: string, x: number, y: number) => void;
};

function BoardEntityLayerComponent({
  tokens,
  selectedTokenId,
  cameraZoom,
  onSelectToken,
  onMoveToken,
}: BoardEntityLayerProps) {
  return (
    <div className="absolute inset-0 z-20">
      {tokens.map((token) => (
        <BoardToken
          key={token.id}
          id={token.id}
          name={token.name}
          x={token.x}
          y={token.y}
          cameraZoom={cameraZoom}
          isSelected={selectedTokenId === token.id}
          onSelect={onSelectToken}
          onMove={onMoveToken}
        />
      ))}
    </div>
  );
}

export const BoardEntityLayer = memo(BoardEntityLayerComponent);

BoardEntityLayer.displayName = "BoardEntityLayer";
