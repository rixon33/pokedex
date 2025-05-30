import { createContext } from "react";
import type { FilterContextType } from "../types/filterType";


export const FilterContext = createContext<FilterContextType | null>(null);
