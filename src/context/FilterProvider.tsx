import { useState, type ReactNode } from "react";
import { FilterContext } from "./FilterContext";

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [filter, setFilter] = useState("All Types");

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    );
};