/**
 * Responsável pela viewport principal do Board.
 * Define a área visual onde todas as layers do mapa são renderizadas.
 */

type BoardViewportProps = {
  children: React.ReactNode;
};

export function BoardViewport({
  children,
}: BoardViewportProps) {
  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
        bg-[#111111]
      "
    >
      {children}
    </div>
  );
}