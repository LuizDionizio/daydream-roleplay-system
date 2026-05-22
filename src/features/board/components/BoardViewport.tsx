/**
 * Responsável pela viewport principal do Board.
 * Controla a área visível, clipping espacial
 * e roteamento central de interação do mundo.
 */

import { useRef, useState } from "react";

import type { MouseEvent, ReactNode } from "react";

import { useInteractionMachine } from "../interactions/systems/InteractionMachine";

import type { DragSelectionState } from "../interactions/types/Interaction";

import type { RectangleBounds } from "../interactions/math/SelectionMath";

interface BoardViewportProps {
  children: ReactNode;

  interaction: ReturnType<typeof useInteractionMachine>;

  onSelectionArea: (bounds: RectangleBounds) => void;
}

export function BoardViewport({
  children,
  interaction,
  onSelectionArea,
}: BoardViewportProps) {
  /**
   * Referência espacial do viewport.
   * Utilizada para cálculo de coordenadas locais.
   */
  const viewportRef = useRef<HTMLDivElement>(null);

  /**
   * Estado geométrico do drag
   * de seleção espacial.
   */
  const [dragSelection, setDragSelection] = useState<DragSelectionState>({
    isDragging: false,

    origin: null,

    current: null,
  });

  /**
   * Converte coordenadas da janela
   * para coordenadas locais do viewport.
   */
  const getRelativePointerPosition = (event: MouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return null;
    }

    const rect = viewport.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,

      y: event.clientY - rect.top,
    };
  };

  /**
   * Bounds visuais da selection box.
   */
  const selectionBox =
    dragSelection.origin && dragSelection.current
      ? {
          left: Math.min(dragSelection.origin.x, dragSelection.current.x),

          top: Math.min(dragSelection.origin.y, dragSelection.current.y),

          width: Math.abs(dragSelection.current.x - dragSelection.origin.x),

          height: Math.abs(dragSelection.current.y - dragSelection.origin.y),
        }
      : null;

  /**
   * Bounds matemáticos da seleção.
   */
  const selectionBounds = selectionBox
    ? {
        left: selectionBox.left,

        top: selectionBox.top,

        right: selectionBox.left + selectionBox.width,

        bottom: selectionBox.top + selectionBox.height,
      }
    : null;

  /**
   * Distância total do drag.
   * Utilizado para evitar
   * micro-seleções acidentais.
   */
  const dragDistance = selectionBox
    ? Math.hypot(selectionBox.width, selectionBox.height)
    : 0;

  /**
   * Inicializa drag de seleção.
   */
  const handlePointerDown = (event: MouseEvent<HTMLDivElement>) => {
    if (interaction.mode !== "select") {
      return;
    }

    const pointerPosition = getRelativePointerPosition(event);

    if (!pointerPosition) {
      return;
    }

    setDragSelection({
      isDragging: true,

      origin: pointerPosition,

      current: pointerPosition,
    });
  };

  /**
   * Atualiza geometria
   * da selection box.
   */
  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragSelection.isDragging) {
      return;
    }

    const pointerPosition = getRelativePointerPosition(event);

    if (!pointerPosition) {
      return;
    }

    setDragSelection((prev) => ({
      ...prev,

      current: pointerPosition,
    }));
  };

  /**
   * Finaliza seleção espacial.
   */
  const handlePointerUp = () => {
    if (selectionBounds && dragDistance > 8) {
      onSelectionArea(selectionBounds);
    }

    setDragSelection({
      isDragging: false,

      origin: null,

      current: null,
    });
  };

  return (
    <div
      ref={viewportRef}
      className="
        relative
        h-full
        w-full
        overflow-hidden
      "
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
    >
      {children}

      {selectionBox && (
        <div
          className="
            pointer-events-none
            absolute
            border
            border-cyan-400/70
            bg-cyan-400/10
            backdrop-blur-[1px]
          "
          style={{
            left: selectionBox.left,

            top: selectionBox.top,

            width: selectionBox.width,

            height: selectionBox.height,
          }}
        />
      )}
    </div>
  );
}
