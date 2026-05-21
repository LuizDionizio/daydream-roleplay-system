/**
 * Responsável pela infraestrutura espacial de entidades do Board.
 * Controla posicionamento e renderização no espaço da câmera.
 */

type BoardEntityProps = {
  x: number;
  y: number;
  children: React.ReactNode;
};

export function BoardEntity({ x, y, children }: BoardEntityProps) {
  return (
    <div
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      className="
        absolute
        top-0 
        left-0
        will-change-transform
      "
    >
      {children}
    </div>
  );
}
