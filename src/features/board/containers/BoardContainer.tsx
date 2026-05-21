export function BoardContainer() {
  return (
    <div className="flex h-full flex-col bg-zinc-900">
      <header className="border-b border-zinc-800 px-4 py-3">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          Board
        </h2>
      </header>

      <div className="flex flex-1 items-center justify-center">
        <span className="text-zinc-600">Mapa principal</span>
      </div>
    </div>
  );
}