import "./App.css";
import { Filters } from "./components/Filters";
import type { Pokemon } from "./types/types"; // o el path correcto a tu archivo
import { PokemonCard } from "./components/PokemonCard";
import { useEffect, useState } from "react";
import { getPokemons } from "./api/pokeApi";
import { useFilters } from "./context/useFilters";
import { PokemonModal } from "./components/PokemonModal";
import { useSearch } from "./context/useSearch";

function App() {
    const { filter } = useFilters();
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    const { search } = useSearch();

    //Modal
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(
        null
    );

    useEffect(() => {
        async function traerDatos() {
            const respuesta = await getPokemons();
            setPokemons(respuesta);
        }
        traerDatos();
    }, []);

    // Restablecer la página a 1 cuando el filtro cambie
    useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    //Filtrando por input
    const pokemonFiltrados = pokemons.filter(
        (poke) => poke.nombre.includes(search.toLowerCase())
    );

    //Paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const pokesPerPage = 12;
    const filteredPokes =
        filter === "All Types"
            ? pokemonFiltrados
            : pokemonFiltrados.filter((poke) =>
                  poke.tipos.includes(filter.toLowerCase())
              );
    const indexOfLast = currentPage * pokesPerPage;
    const indexOfFirst = indexOfLast - pokesPerPage;
    const currentPokes = filteredPokes.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredPokes.length / pokesPerPage);

    return (
        <div className=" pt-20 px-20 sm:p-10 sm:px-40 sm:pt-30 flex flex-col gap-10">
            <Filters />
            {selectedPokemon && (
                <PokemonModal
                    pokemon={selectedPokemon}
                    onClose={() => setSelectedPokemon(null)}
                />
            )}

            {/*Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
                {currentPokes.map((pokemon, index) => (
                    <PokemonCard
                        key={pokemon.nombre}
                        pokemon={pokemon}
                        index={indexOfFirst + index}
                        onClick={() => setSelectedPokemon(pokemon)}
                    />
                ))}
            </div>
            <div className="flex justify-center gap-4 mt-6 items-center">
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="text-white font-semibold">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default App;
