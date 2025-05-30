import { useContext } from "react";
import { FilterContext } from "./FilterContext";

export const useFilters = () => {
    const contexto = useContext(FilterContext);

    if (!contexto) {
        throw new Error("useFilters debe estar dentro de un FilterProvider");
    }
    return contexto;
};
