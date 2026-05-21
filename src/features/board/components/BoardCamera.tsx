/**
 * Responsável pelo sistema de câmera do Board.
 * Controla movimentação espacial da viewport.
 */

import { useEffect, useRef, useState } from "react";

type BoardCameraProps = {
  children: React.ReactNode;
};

export function BoardCamera({ children }: BoardCameraProps) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  const lastMousePosition = useRef({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - lastMousePosition.current.x;

      const deltaY = event.clientY - lastMousePosition.current.y;

      setPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      lastMousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };
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
    setIsDragging(true);

    lastMousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    const zoomIntensity = 0.1;

    const delta = event.deltaY > 0 ? -zoomIntensity : zoomIntensity;

    setZoom((prev) => {
      const nextZoom = prev + delta;

      return Math.min(Math.max(nextZoom, 0.5), 2);
    });
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      className="
        h-full
        w-full
        cursor-grab
        active:cursor-grabbing
      "
    >
      <div
        style={{
          transform: `
            translate3d(${position.x}px, ${position.y}px, 0)
            scale(${zoom})
            `,
        }}
        className="
          relative
          h-full
          w-full
          will-change-transform
        "
      >
        {children}
      </div>
    </div>
  );
}
