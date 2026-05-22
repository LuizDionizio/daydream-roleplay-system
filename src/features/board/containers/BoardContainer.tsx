/**
 * Responsável pela estrutura principal do Board.
 * Organiza viewport, câmera e layers visuais do mapa.
 */

import { useState } from "react";

import { BoardCamera } from "../components/BoardCamera";
import { BoardCanvasLayer } from "../components/BoardCanvasLayer";
import { BoardOverlayLayer } from "../components/BoardOverlayLayer";
import { BoardSelectionHUD } from "../components/BoardSelectionHUD";
import { BoardViewport } from "../components/BoardViewport";

import type { BoardTokenData } from "../types/board";
import type { BoardCameraState } from "../types/camera";

import { useInteractionMachine } from "../interactions/systems/InteractionMachine";

import { rectanglesIntersect } from "../interactions/math/SelectionMath";

import type { RectangleBounds } from "../interactions/math/SelectionMath";

export function BoardContainer() {
  /**
   * Tokens atualmente selecionados.
   * Preparado para multi-seleção.
   */
  const [selectedTokenIds, setSelectedTokenIds] = useState<string[]>([]);

  /**
   * Estado global das entidades do board.
   */
  const [tokens, setTokens] = useState<BoardTokenData[]>([
    {
      id: "token-1",
      x: 896,
      y: 896,
      name: "Wanderer",
    },
    {
      id: "token-2",
      x: 1024,
      y: 768,
      name: "Ashen One",
    },
    {
      id: "token-3",
      x: 768,
      y: 1024,
      name: "Watcher",
    },
  ]);

  /**
   * Estado espacial da câmera.
   */
  const [camera, setCamera] = useState<BoardCameraState>({
    x: 0,
    y: 0,
    zoom: 1,
  });

  /**
   * Estado operacional global
   * do Board.
   */
  const interaction = useInteractionMachine();

  const isSelectMode = interaction.mode === "select";

  const isDragMode = interaction.mode === "drag";

  /**
   * Responsável pela movimentação
   * persistente das entidades.
   */
  const moveToken = (tokenId: string, x: number, y: number) => {
    setTokens((prev) =>
      prev.map((token) =>
        token.id === tokenId
          ? {
              ...token,
              x,
              y,
            }
          : token,
      ),
    );
  };

  /**
   * Responsável pela query espacial
   * de seleção das entidades.
   */
  const handleSelectionArea = (bounds: RectangleBounds) => {
    const selectedIds = tokens

      .filter((token) => {
        /**
         * Bounds simplificados.
         * Futuramente:
         * entity render bounds reais.
         */
        const tokenBounds = {
          left: token.x,

          top: token.y,

          right: token.x + 64,

          bottom: token.y + 64,
        };

        return rectanglesIntersect(bounds, tokenBounds);
      })

      .map((token) => token.id);

    setSelectedTokenIds(selectedIds);
  };

  return (
    <div
      className="
        flex
        h-full
        flex-col
        overflow-hidden
        bg-zinc-900
      "
    >
      <header
        className="
          flex
          items-center
          justify-between
          border-b
          border-zinc-800
          px-4
          py-3
        "
      >
        <h2
          className="
            text-xs
            font-medium
            uppercase
            tracking-[0.2em]
            text-zinc-500
          "
        >
          Board
        </h2>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <button
            onClick={() => interaction.setMode("select")}
            className={`
              rounded-md
              border
              px-3
              py-1.5
              text-xs
              transition-colors

              ${
                isSelectMode
                  ? `
                    border-cyan-400/60
                    bg-cyan-400/10
                    text-cyan-200
                  `
                  : `
                    border-zinc-700
                    bg-zinc-800/80
                    text-zinc-400
                  `
              }
            `}
          >
            Select
          </button>

          <button
            onClick={() => interaction.setMode("drag")}
            className={`
              rounded-md
              border
              px-3
              py-1.5
              text-xs
              transition-colors

              ${
                isDragMode
                  ? `
                    border-cyan-400/60
                    bg-cyan-400/10
                    text-cyan-200
                  `
                  : `
                    border-zinc-700
                    bg-zinc-800/80
                    text-zinc-400
                  `
              }
            `}
          >
            Pan
          </button>
        </div>
      </header>

      <div
        className="
          relative
          flex-1
          overflow-hidden
        "
      >
        <BoardViewport
          interaction={interaction}
          onSelectionArea={handleSelectionArea}
        >
          <BoardCamera
            camera={camera}
            setCamera={setCamera}
            interaction={interaction}
          >
            <BoardCanvasLayer
              tokens={tokens}
              /**
               * Compatibilidade temporária
               * até o sistema completo
               * de multi-seleção.
               */
              selectedTokenId={selectedTokenIds[0] ?? null}
              onSelectToken={(tokenId) =>
                setSelectedTokenIds(tokenId ? [tokenId] : [])
              }
              onMoveToken={moveToken}
              cameraZoom={camera.zoom}
            />

            <BoardOverlayLayer />
          </BoardCamera>

          <BoardSelectionHUD selectedTokenId={selectedTokenIds[0] ?? null} />
        </BoardViewport>
      </div>
    </div>
  );
}
