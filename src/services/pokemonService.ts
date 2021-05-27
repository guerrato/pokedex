import { injectable } from "inversify";
import { Pokemon } from "../models/pokemon";
import { PokemonList } from "../models/pokemonList";
import { PokemonSprite } from "../models/pokemonSprite";
import { PokemonStat } from "../models/pokemonStat";
import { PokemonType } from "../models/pokemonType";
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
    };

    async get(filter: string): Promise<PokemonList> {
        const response = await fetch(`${this.pokeAPI}pokemon/${filter}`);
        const data = await response.json();

        const pokeList = new PokemonList();

        pokeList.Count = 1;

        pokeList.Pokemons = new Array<Pokemon>({
            Id: data.id,
            Name: data.name,
            Url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`
        });

        return pokeList;
    };

    async detail(id: number): Promise<Pokemon> {
        const url = `${this.pokeAPI}pokemon/${id}/`;
        const response = await fetch(url);
        const data = await response.json();

        const types:PokemonType[] = data.types.map((tp:any) =>{
            const pkT = new PokemonType();
            pkT.Url = tp.type.url;
            pkT.Name = tp.type.name;
            pkT.Slot = parseInt(tp.slot);

            return pkT;
        });

        const sprite = new PokemonSprite();
        sprite.Default = data.sprites.front_default;
        sprite.Shiny = data.sprites.front_shiny;

        const stats = data.stats.map((st: any) => {
            const stat = new PokemonStat();

            stat.Name = st.stat.name;
            stat.BaseStat = st.base_stat;
            stat.Effort = st.effort;

            return stat;
        });

        return new Pokemon(data.name, url, parseInt(data.id), types, sprite, stats);
    };

}