/**
 * Responsável pelos cálculos geométricos
 * de seleção espacial do Board.
 */

export interface RectangleBounds {
  left: number;

  top: number;

  right: number;

  bottom: number;
}

export function rectanglesIntersect(a: RectangleBounds, b: RectangleBounds) {
  return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
  );
}
