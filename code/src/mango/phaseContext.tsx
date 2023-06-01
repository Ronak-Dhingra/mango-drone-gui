import { PhaseContextType } from "./types";
import { createContext } from "react";

export const PhaseContext = createContext<PhaseContextType | null>(null);
