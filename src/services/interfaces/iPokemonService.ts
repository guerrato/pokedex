import { Pokemon } from "../../models/pokemon";
import { PokemonList } from "../../models/pokemonList";

export interface IPokemonService {
    list(offset?:number, limit?:number): Promise<PokemonList>;
    get(filter:string): Promise<PokemonList>;
    detail(id:number): Promise<Pokemon>;
}