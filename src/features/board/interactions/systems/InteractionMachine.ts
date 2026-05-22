/**
 * Responsável pelo gerenciamento do estado global
 * de interação espacial do Board.
 */

import { useState } from "react";
import type { InteractionMode } from "../types/Interaction";

export function useInteractionMachine() {
  const [mode, setMode] = useState<InteractionMode>("select");

  return {
    mode,
    setMode,
  };
}
