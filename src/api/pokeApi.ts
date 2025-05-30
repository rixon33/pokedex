import type { Pokemon } from "../types/types";

interface AbilityEntry {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

interface TypeEntry {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export const getPokemons = async (): Promise<Pokemon[]> => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
    const data = await res.json();

    const promises = data.results.map(async (poke: { url: string }) => {
        const resPoke = await fetch(poke.url);
        const dataPoke = await resPoke.json();
        return {
            nombre: dataPoke.name,
            descripcion: "",
            altura: dataPoke.height / 10,
            peso: dataPoke.weight / 10,
            hp: dataPoke.stats[0].base_stat,
            ataque: dataPoke.stats[1].base_stat,
            defensa: dataPoke.stats[2].base_stat,
            sp_atack: dataPoke.stats[3].base_stat,
            sp_def: dataPoke.stats[4].base_stat,
            speed: dataPoke.stats[5].base_stat,
            habilidades: dataPoke.abilities.map(
                (a: AbilityEntry) => a.ability.name
            ),
            tipos: dataPoke.types.map((t: TypeEntry) => t.type.name),
            imagen: dataPoke.sprites.other["official-artwork"].front_default,
            id: dataPoke.id,
        };
    });

    return Promise.all(promises);
};
