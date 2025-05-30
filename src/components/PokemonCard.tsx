import type { Pokemon } from "../types/types";
import { filtros } from "../data/filtros";

type Props = {
    pokemon: Pokemon;
    index: number;
    onClick?: () => void;
};

export const PokemonCard = ({ pokemon, index, onClick }: Props) => {
    return (
        <div
            className="group bg-gradient-to-tl from-[#16001c] to-[#270a37] border rounded-2xl border-[#922a92] shadow shadow-[#922a92] p-3 transform transition-transform duration-300 hover:sm:scale-105 hover scale-102 cursor-pointer"
            key={index}
            onClick={onClick}
        >
            <img
                src={pokemon.imagen}
                alt={pokemon.nombre}
                className="transition-transform duration-400 delay-20 group-hover:sm:scale-110 scale-105 mx-auto"
            />
            <div className="px-2 flex flex-col">
                <span className="text-gray-400 font-semibold">
                    #{(index + 1).toString().padStart(3, "0")}
                </span>
                <span className="font-semibold text-xl">{pokemon.nombre}</span>
                <div className="flex gap-2 mt-1">
                    {pokemon.tipos.map((tipo) => {
                        const filtro = filtros.find(
                            (f) => f.nombre.toLowerCase() === tipo.toLowerCase()
                        );
                        return (
                            <span
                                key={tipo}
                                className={`px-2 py-1 text-sm font-semibold tracking-wide rounded-2xl ${
                                    filtro?.base || "bg-gray-700 text-white"
                                }`}
                            >
                                {tipo}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
