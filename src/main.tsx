import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App.tsx";
import { NavBar } from "./components/NavBar.tsx";
import { FilterProvider } from "./context/FilterProvider.tsx";
import { SearchProvider } from "./context/SearchProvider.tsx";
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SearchProvider>

        <FilterProvider>
            <BrowserRouter>
                <NavBar />
                <App />
            </BrowserRouter>
        </FilterProvider>
        </SearchProvider>
    </StrictMode>
);
