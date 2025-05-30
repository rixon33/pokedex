import { useState, type ReactNode } from "react";
import { searchContext } from "./SearchContext";


export const SearchProvider = ({children}: {children: ReactNode}) => {
    const [search, setSearch] = useState('')
    return (
        <searchContext.Provider value={{search,setSearch}}>
            {children}
        </searchContext.Provider>
    )
}