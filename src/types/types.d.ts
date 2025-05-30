export type Pokemon = {
    nombre: string;
    descripcion: string;
    altura: number;
    peso: number;
    hp: number;
    ataque: number;
    defensa: number;
    sp_atack: number;
    sp_def: number;
    speed: number;
    habilidades: string[];
    tipos: string[];
    imagen: string;
    id: number;
};
export type Colors = {
    [color: string]: string;
};