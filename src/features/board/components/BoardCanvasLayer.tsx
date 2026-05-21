/**
 * Responsável pela camada principal de renderização do Board.
 * Futuramente conterá mapas, grid, tokens e elementos visuais do cenário.
 */
export function BoardCanvasLayer() {
  return (
    <div
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
      "
    >
      {/* MAP SURFACE */}
      <div
        className="
          relative
          h-[2200px]
          w-[3200px]
          overflow-hidden
          rounded-[40px]
          border
          border-zinc-800
          bg-[#0f0f10]
          shadow-2xl
        "
      >
        {/* DEPTH GRADIENT */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03),_transparent_70%)]
          "
        />

        {/* GRID */}
        <div
        className="
            absolute
            inset-0
            opacity-[0.12]
        "
        style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px),

            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: `
            64px 64px,
            64px 64px,
            16px 16px,
            16px 16px
            `,
        }}
        />

        {/* VIGNETTE */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,_transparent_45%,_rgba(0,0,0,0.55))]
          "
        />
      </div>
    </div>
  );
}