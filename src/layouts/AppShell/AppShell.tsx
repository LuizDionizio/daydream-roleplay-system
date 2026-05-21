import { useEffect, useState } from "react";

import { BoardContainer } from "@/features/board/containers/BoardContainer";
import { ChroniclesContainer } from "@/features/chronicles/containers/ChroniclesContainer";
import { TableContainer } from "@/features/table/containers/TableContainer";

export function AppShell() {

  const [tableWidth, setTableWidth] = useState(() => {
    const savedWidth = localStorage.getItem("dd-table-width");

      return savedWidth ? Number(savedWidth) : 320;
  });

  const [chroniclesHeight, setChroniclesHeight] = useState(() => {
    const savedHeight = localStorage.getItem("dd-chronicles-height");

    return savedHeight ? Number(savedHeight) : 240;
  });

  const [isResizingTable, setIsResizingTable] = useState(false);
  const [isResizingChronicles, setIsResizingChronicles] = useState(false);

  const [isTableCollapsed, setIsTableCollapsed] = useState(() => {
    const saved = localStorage.getItem("dd-table-collapsed");

    return saved === "true";
  });
  const [lastTableWidth, setLastTableWidth] = useState(320);

  const toggleTableCollapse = () => {
      if (isTableCollapsed) {
        setTableWidth(lastTableWidth);
        setIsTableCollapsed(false);
      } else {
        setLastTableWidth(tableWidth);
        setTableWidth(0);
        setIsTableCollapsed(true);
      }
  };

  const [isChroniclesCollapsed, setIsChroniclesCollapsed] = useState(() => {
    const saved = localStorage.getItem("dd-chronicles-collapsed");

    return saved === "true";
  });
  const [lastChroniclesHeight, setLastChroniclesHeight] = useState(240);

  const toggleChroniclesCollapse = () => {
    if (isChroniclesCollapsed) {
      setChroniclesHeight(lastChroniclesHeight);
      setIsChroniclesCollapsed(false);
    } else {
      setLastChroniclesHeight(chroniclesHeight);
      setChroniclesHeight(0);
      setIsChroniclesCollapsed(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // TABLE RESIZE
      if (isResizingTable) {
        const newWidth = window.innerWidth - event.clientX;

        const clampedWidth = Math.min(
          Math.max(newWidth, 240),
          600
        );

        setTableWidth(clampedWidth);
      }

      // CHRONICLES RESIZE
      if (isResizingChronicles) {
        const newHeight = window.innerHeight - event.clientY;

        const clampedHeight = Math.min(
          Math.max(newHeight, 160),
          500
        );

        setChroniclesHeight(clampedHeight);
      }
    };

    

    const handleMouseUp = () => {
      setIsResizingTable(false);
      setIsResizingChronicles(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizingTable, isResizingChronicles]);

  useEffect(() => {
    localStorage.setItem(
      "dd-table-width",
      String(tableWidth)
    );
  }, [tableWidth]);

  useEffect(() => {
    localStorage.setItem(
      "dd-chronicles-height",
      String(chroniclesHeight)
    );
  }, [chroniclesHeight]);

  useEffect(() => {
    localStorage.setItem(
      "dd-table-collapsed",
      String(isTableCollapsed)
    );
  }, [isTableCollapsed]);

  useEffect(() => {
    localStorage.setItem(
      "dd-chronicles-collapsed",
      String(isChroniclesCollapsed)
    );
  }, [isChroniclesCollapsed]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div
        className="grid h-full w-full gap-px bg-zinc-800"
        style={{
          gridTemplateColumns: `1fr 8px ${tableWidth}px`,
          gridTemplateRows: `1fr 8px ${chroniclesHeight}px`,
        }}
      >
        {/* BOARD */}
        <main className="min-w-0 min-h-0">
          <BoardContainer />
        </main>

        {/* VERTICAL HANDLE */}
        <div
          className="
            relative
            flex
            items-center
            justify-center
            bg-zinc-800
            transition-colors
            hover:bg-zinc-700/60
          "
        >
          {/* RESIZE AREA */}
          <div
            onMouseDown={() => {
              if (!isTableCollapsed) {
                setIsResizingTable(true);
              }
            }}
            className="
              absolute
              inset-0
              cursor-col-resize
            "
          />

          {/* COLLAPSE BUTTON */}
          <button
            onClick={toggleTableCollapse}
            className="
              z-10
              flex
              items-center
              justify-center
              text-[16px]
              font-bold
              leading-none
              text-zinc-600
              transition-colors
              hover:text-zinc-300
            "
          >
            {isTableCollapsed ? "⥏" : "⥑"}
          </button>
        </div>

        {/* TABLE */}
        <aside className="min-w-0 min-h-0 row-span-3">
          <TableContainer />
        </aside>

        {/* HORIZONTAL HANDLE */}
        <div
          className="
            relative
            col-span-2
            flex
            items-center
            justify-center
            bg-zinc-800
            transition-colors
            hover:bg-zinc-700/60
          "
        >
          {/* RESIZE AREA */}
          <div
            onMouseDown={() => {
              if (!isChroniclesCollapsed) {
                setIsResizingChronicles(true);
              }
            }}
            className="
              absolute
              inset-0
              cursor-row-resize
            "
          />

          {/* COLLAPSE BUTTON */}
          <button
            onClick={toggleChroniclesCollapse}
            className="
              z-10
              flex
              items-center
              justify-center
              text-[16px]
              font-bold
              leading-none
              text-zinc-600
              transition-colors
              hover:text-zinc-300
            "
          >
            {isChroniclesCollapsed ? "⥐" : "⥎"}
          </button>
        </div>

        {/* CHRONICLES */}
        <section className="col-span-2 min-h-0 overflow-hidden">
          <ChroniclesContainer />
        </section>
      </div>
    </div>
  );
}