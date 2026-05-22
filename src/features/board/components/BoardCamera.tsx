/**
 * Responsável pelo sistema de câmera do Board.
 * Controla movimentação espacial da viewport.
 */

import { useEffect, useRef, useState } from "react";

import type { BoardCameraState } from "../types/camera";

import { useInteractionMachine } from "../interactions/systems/InteractionMachine";

type BoardCameraProps = {
  camera: BoardCameraState;

  setCamera: React.Dispatch<React.SetStateAction<BoardCameraState>>;

  children: React.ReactNode;

  interaction: ReturnType<typeof useInteractionMachine>;
};

export function BoardCamera({
  camera,
  setCamera,
  children,
  interaction,
}: BoardCameraProps) {
  const [isDragging, setIsDragging] = useState(false);

  const lastMousePosition = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - lastMousePosition.current.x;

      const deltaY = event.clientY - lastMousePosition.current.y;

      setCamera((prev) => ({
        ...prev,

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
  }, [isDragging, setCamera]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    /**
     * A câmera só deve iniciar pan
     * quando o modo operacional ativo
     * for "drag".
     */

    if (interaction.mode !== "drag") {
      return;
    }

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

    const newZoom = camera.zoom + delta;

    const clampedZoom = Math.min(Math.max(newZoom, 0.4), 2.5);

    setCamera((prev) => ({
      ...prev,

      zoom: clampedZoom,
    }));
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
            translate3d(
              ${camera.x}px,
              ${camera.y}px,
              0
            )
            scale(${camera.zoom})
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
