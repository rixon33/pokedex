import { createContext } from "react";

type searchContextType = {
    search: string; 
    setSearch: (parametro: string) => void;
};

export const searchContext = createContext<searchContextType | null>(null);
