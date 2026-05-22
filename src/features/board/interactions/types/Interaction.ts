/**
 * Define os modos operacionais do Board.
 * Responsável pelo estado global de interação espacial.
 */

export type InteractionMode = "idle" | "select" | "drag" | "measure" | "ping";

export interface InteractionState {
  mode: InteractionMode;
}

export interface PointerPosition {
  x: number;
  y: number;
}

export interface DragSelectionState {
  isDragging: boolean;

  origin: PointerPosition | null;

  current: PointerPosition | null;
}
