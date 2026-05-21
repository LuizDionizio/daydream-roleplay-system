/**
 * Responsável pela representação visual de tokens do Board.
 * Futuramente representará jogadores, NPCs e criaturas.
 */

import { useEffect, useState } from "react";

import { BoardEntity } from "./BoardEntity";

type BoardTokenProps = {
  x: number;
  y: number;
};

export function BoardToken({ x, y }: BoardTokenProps) {
  const [position, setPosition] = useState({
    x,
    y,
  });

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      setPosition((prev) => ({
        x: prev.x + event.movementX,
        y: prev.y + event.movementY,
      }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    setIsDragging(true);
  };

  return (
    <BoardEntity x={position.x} y={position.y}>
      <div
        onMouseDown={handleMouseDown}
        className="
          flex
          h-16
          w-16
          cursor-grab
          items-center
          justify-center
          rounded-full
          border
          border-zinc-500
          bg-zinc-800
          shadow-lg
          active:cursor-grabbing
        "
      >
        <div
          className="
            h-10
            w-10
            rounded-full
            bg-zinc-600
          "
        />
      </div>
    </BoardEntity>
  );
}
