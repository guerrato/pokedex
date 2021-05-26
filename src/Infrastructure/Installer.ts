import "reflect-metadata";
import { Container } from "inversify";

import SERVICE_IDENTIFIER from "../Constants/Identifiers";
import {IPokemonService} from "../services/interfaces/iPokemonService";
import {PokemonService} from "../services/pokemonService";

let container = new Container();
container.bind<IPokemonService>(SERVICE_IDENTIFIER.IPokemonService).to(PokemonService);

export default container;