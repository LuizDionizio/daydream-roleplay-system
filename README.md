# DayDream

DayDream is a modular narrative-focused Virtual Tabletop and spatial roleplay engine built around immersive interaction, cinematic atmosphere, and scalable world systems.

The project is designed not merely as a “token board”, but as a long-term foundation for a fully operational spatial storytelling platform.

---

# Vision

DayDream aims to combine:

- narrative immersion
- spatial interaction
- tactical elegance
- cinematic presentation
- modular architecture
- operational tooling

The project draws inspiration from:

- Foundry VTT
- Miro
- Figma
- RTS interfaces
- spatial editing software

---

# Core Philosophy

The architecture follows strict separation of responsibilities.

Every system exists as an isolated operational layer.

The board is treated as:

> a spatial operating system.

Not a monolithic canvas.

---

# Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS v4

---

# Current Architecture

```txt
src/
├── app/
│   └── layout/
│       └── AppShell.tsx
│
├── features/
│   ├── board/
│   │   ├── components/
│   │   │   ├── BoardCamera.tsx
│   │   │   ├── BoardCanvasLayer.tsx
│   │   │   ├── BoardOverlayLayer.tsx
│   │   │   ├── BoardSelectionHUD.tsx
│   │   │   ├── BoardViewport.tsx
│   │   │   │
│   │   │   └── layers/
│   │   │       ├── BoardAtmosphereLayer.tsx
│   │   │       ├── BoardEntityLayer.tsx
│   │   │       ├── BoardGridLayer.tsx
│   │   │       └── BoardTerrainLayer.tsx
│   │   │
│   │   ├── containers/
│   │   │   └── BoardContainer.tsx
│   │   │
│   │   ├── entities/
│   │   │   ├── BoardEntity.tsx
│   │   │   └── BoardToken.tsx
│   │   │
│   │   ├── interactions/
│   │   │   ├── math/
│   │   │   │   └── selectionMath.ts
│   │   │   │
│   │   │   ├── systems/
│   │   │   │   └── interactionMachine.ts
│   │   │   │
│   │   │   └── types/
│   │   │       └── interaction.ts
│   │   │
│   │   └── types/
│   │       ├── board.ts
│   │       └── camera.ts
│   │
│   ├── chronicles/
│   │   └── containers/
│   │       └── ChroniclesContainer.tsx
│   │
│   └── table/
│       └── containers/
│           └── TableContainer.tsx
│
├── App.tsx
├── main.tsx
└── index.css
```
