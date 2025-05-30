import { useContext } from "react";
import { searchContext } from "./SearchContext";

export const useSearch = () => {
    const context = useContext(searchContext);
    if (!context) {
        throw new Error("error");
    }
    return context;
};
