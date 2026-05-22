/**
 * Responsável pela exibição contextual da entidade selecionada.
 * Renderiza informações e ações relacionadas ao foco atual do Board.
 */

import { memo } from "react";

type BoardSelectionHUDProps = {
  selectedTokenId: string | null;
};

function BoardSelectionHUDComponent({
  selectedTokenId,
}: BoardSelectionHUDProps) {
  if (!selectedTokenId) return null;

  return (
    <div
      className="
        pointer-events-none
        absolute
        bottom-6
        left-6
        z-50
      "
    >
      <div
        className="
          min-w-65
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-950/90
          p-4
          shadow-2xl
          backdrop-blur-md
        "
      >
        <div className="space-y-2">
          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                text-zinc-500
              "
            >
              Selected Entity
            </p>

            <h3
              className="
                mt-1
                text-lg
                font-semibold
                text-zinc-100
              "
            >
              Wanderer
            </h3>
          </div>

          <div
            className="
              h-px
              bg-zinc-800
            "
          />

          <div className="space-y-1 text-sm">
            <p className="text-zinc-400">Type: Player</p>

            <p className="text-zinc-400">Status: Active</p>

            <p className="text-zinc-400">ID: {selectedTokenId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export const BoardSelectionHUD = memo(BoardSelectionHUDComponent);
BoardSelectionHUD.displayName = "BoardSelectionHUD";
