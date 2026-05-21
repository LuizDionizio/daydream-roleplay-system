/**
 * Responsável pela estrutura principal do Board.
 * Organiza viewport, câmera e layers visuais do mapa.
 */

import { BoardCamera } from "../components/BoardCamera";
import { BoardCanvasLayer } from "../components/BoardCanvasLayer";
import { BoardOverlayLayer } from "../components/BoardOverlayLayer";
import { BoardViewport } from "../components/BoardViewport";

export function BoardContainer() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-zinc-900">
      <header className="border-b border-zinc-800 px-4 py-3">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          Board
        </h2>
      </header>

      <div className="relative flex-1 overflow-hidden">
        <BoardViewport>
          <BoardCamera>
            <BoardCanvasLayer />
            <BoardOverlayLayer />
          </BoardCamera>
        </BoardViewport>
      </div>
    </div>
  );
}