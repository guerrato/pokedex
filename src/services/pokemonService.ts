import { injectable } from "inversify";
import { Pokemon } from "../models/pokemon";
import { PokemonList } from "../models/pokemonList";
import { IPokemonService } from "./interfaces/iPokemonService";

@injectable()
export class PokemonService implements IPokemonService{
    
    private pokeAPI:string = "https://pokeapi.co/api/v2/";

    async list(offset = 0, limit = 20): Promise<PokemonList> {
        const response = await fetch(`${this.pokeAPI}pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();

        const pokeList = new PokemonList();

        pokeList.Count = data.count;

        const pokemons: Array<Pokemon> = data.results.map((pk:any) => {
            return {
                Name: pk.name,
                Url: pk.url
            };
        });
        pokeList.Pokemons = pokemons;

        return pokeList;
    }

}