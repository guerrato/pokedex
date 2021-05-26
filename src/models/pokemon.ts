export class Pokemon{

    constructor(name: string, url: string, id?: number,  type?: string , normalSprite?:string, shinySprite?:string, stats?:string){
        this.Name = name;
        this.Url = url;
        this.Id = id;
        this.Type = type;
        this.NormalSprite = normalSprite;
        this.ShinySprite = shinySprite;
        this.Stats = stats;
    }

    public Id? : number;
    public Name : string;
    public Type? : string;
    public Url: string;
    public NormalSprite? : string;
    public ShinySprite? : string;
    public Stats? : string;

}