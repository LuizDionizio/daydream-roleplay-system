/**
 * Responsável pela representação visual de tokens do Board.
 * Futuramente representará jogadores, NPCs e criaturas.
 */

import { useEffect, useState } from "react";
import { memo } from "react";
import { BoardEntity } from "./BoardEntity";

type BoardTokenProps = {
  id: string;
  name: string;
  x: number;
  y: number;

  isSelected: boolean;

  onSelect: (id: string) => void;

  onMove: (tokenId: string, x: number, y: number) => void;

  cameraZoom: number;
};

function BoardTokenComponent({
  id,
  name,
  x,
  y,
  cameraZoom,
  isSelected,
  onSelect,
  onMove,
}: BoardTokenProps) {
  const [isDragging, setIsDragging] = useState(false);

  const [localPosition, setLocalPosition] = useState({
    x,
    y,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      setLocalPosition((prev) => ({
        x: prev.x + event.movementX / cameraZoom,

        y: prev.y + event.movementY / cameraZoom,
      }));
    };

    const handleMouseUp = () => {
      if (!isDragging) return;

      setIsDragging(false);

      const snappedX = Math.round(localPosition.x / 64) * 64;

      const snappedY = Math.round(localPosition.y / 64) * 64;

      /**
       * Persistência real no Board state
       */
      onMove(id, snappedX, snappedY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, localPosition, cameraZoom, id, onMove]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    /**
     * Sincroniza posição local
     * antes do drag começar.
     */
    setLocalPosition({
      x,
      y,
    });

    onSelect(id);

    setIsDragging(true);
  };

  return (
    <BoardEntity x={localPosition.x} y={localPosition.y}>
      <div
        onMouseDown={handleMouseDown}
        className={`
          flex
          h-16
          w-16
          cursor-grab
          items-center
          justify-center
          rounded-full
          border
          bg-zinc-800
          active:cursor-grabbing
          transition-all
          duration-150
          select-none

          ${
            isSelected
              ? "border-zinc-200 shadow-[0_0_24px_rgba(255,255,255,0.18)]"
              : "border-zinc-500 shadow-lg"
          }
        `}
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-zinc-600
            text-[10px]
            font-medium
            text-zinc-200
          "
        >
          {name[0]}
        </div>
      </div>
    </BoardEntity>
  );
}

export const BoardToken = memo(BoardTokenComponent);
BoardToken.displayName = "BoardToken";
