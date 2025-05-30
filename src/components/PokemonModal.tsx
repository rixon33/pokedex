import type { Pokemon } from "../types/types";
import { ChartNoAxesColumn } from "lucide-react";
// import { filtros } from "../data/filtros"; // Ya no se usa
import { useEffect } from "react";

interface Props {
    pokemon: Pokemon;
    onClose: () => void;
}

const getColorByValue = (value: number) => {
    if (value < 50) return "bg-red-500";
    if (value < 80) return "bg-yellow-400";
    return "bg-lime-500";
};

const StatBar = ({ label, value }: { label: string; value: number }) => {
    const width = Math.min((value / 150) * 100, 100);
    const barColor = getColorByValue(value);

    return (
        <div>
            <div className="flex justify-between text-sm font-medium text-gray-300">
                <span>{label}</span>
                <span>{value}</span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full mt-1">
                <div
                    className={`h-2 rounded-full ${barColor} transition-all duration-300`}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
};

export const PokemonModal = ({ pokemon, onClose }: Props) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 bg-[#111]/90 flex items-center justify-center px-4"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-gradient-to-br from-[#16001c] to-[#270a37] rounded-lg max-w-5xl w-full relative shadow-xl border border-[#922a92]/30 text-white flex justify-center flex-col max-h-[90vh] overflow-y-auto sm:overflow-y-hidden`}
            >
                {/* Header */}
                <div
                    className={`flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#16001c] to-[#270a37] border-b border-[#922a92]/30`}
                >
                    <div className="flex flex-col">
                        <span className="font-bold text-base text-gray-400">
                            #{String(pokemon.id || 1).padStart(3, "0")}
                        </span>
                        <span className="text-4xl font-bold tracking-wide capitalize mt-1">
                            {pokemon.nombre}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white text-4xl font-bold hover:text-gray-300 transition-colors"
                    >
                        &times;
                    </button>
                </div>

                {/* Body */}
                <div className="flex flex-col md:flex-row gap-10 p-6">
                    {/* Imagen y tipos */}
                    <div className="flex flex-col items-center">
                        <img
                            src={pokemon.imagen}
                            alt={pokemon.nombre}
                            className="w-60 h-60 sm:w-full sm:h-auto  sm:max-w-xs object-contain mx-auto mb-8 mt-40 sm:mt-0"
                        />
                        <div className="flex gap-2 justify-center flex-wrap">
                            {pokemon.tipos.map((tipo) => (
                                <span
                                    key={tipo}
                                    className={`px-4 py-2 text-sm font-semibold tracking-wide rounded-full bg-[#3a1c4d] text-gray-200 border border-[#922a92]/30`}
                                >
                                    {tipo.charAt(0).toUpperCase() +
                                        tipo.slice(1)}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Stats y habilidades */}
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold tracking-wide mb-4 flex items-center gap-3 border-b border-gray-700 pb-2 text-purple-300">
                            <ChartNoAxesColumn className="w-7 h-7 text-purple-400" />
                            Base Stats
                        </h3>
                        <div className="space-y-4">
                            <StatBar label="HP" value={pokemon.hp} />
                            <StatBar label="Attack" value={pokemon.ataque} />
                            <StatBar label="Defense" value={pokemon.defensa} />
                            <StatBar label="Sp. Atk" value={pokemon.sp_atack} />
                            <StatBar label="Sp. Def" value={pokemon.sp_def} />
                            <StatBar label="Speed" value={pokemon.speed} />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
                            <div className="text-center bg-[#260a2d] py-4 rounded-lg font-semibold border border-[#922a92]/50">
                                <p className="text-gray-400">Height</p>
                                <p className="text-lg font-bold mt-1">
                                    {pokemon.altura} m
                                </p>
                            </div>
                            <div className="text-center bg-[#260a2d] py-4 rounded-lg font-semibold border border-[#922a92]/50">
                                <p className="text-gray-400">Weight</p>
                                <p className="text-lg font-bold mt-1">
                                    {pokemon.peso} kg
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-semibold mb-3 text-xl tracking-wide border-b border-gray-700 pb-2 text-purple-300">
                                Abilities
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {pokemon.habilidades.map((h) => (
                                    <span
                                        key={h}
                                        className="bg-[#3a1c4d] px-4 py-2 rounded-full text-sm font-medium text-gray-200 border border-[#922a92]/30"
                                    >
                                        {h}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
