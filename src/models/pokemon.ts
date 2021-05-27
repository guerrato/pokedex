import { PokemonSprite } from "./pokemonSprite";
import { PokemonStat } from "./pokemonStat";
import { PokemonType } from "./pokemonType";

export class Pokemon{

    constructor(name: string, url: string, id?: number,  type?: Array<PokemonType>, sprite?: PokemonSprite, stats?: PokemonStat[]){
        this.Name = name;
        this.Url = url;
        this.Id = id;
        this.Type = type;
        this.Sprite = sprite;
        this.Stats = stats;
    }

    public Id? : number;
    public Name : string;
    public Type? : Array<PokemonType>;
    public Url: string;
    public Sprite? : PokemonSprite;
    public Stats? : PokemonStat[];

}