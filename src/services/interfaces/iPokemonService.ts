import { PokemonList } from "../../models/pokemonList";

export interface IPokemonService {
    list(offset?:number, limit?:number): Promise<PokemonList>;
}