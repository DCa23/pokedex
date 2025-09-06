import { createInterface, Interface } from "node:readline";
import { getCommands } from "./repl.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    map: {
        nextLocationsURL: string | null,
        prevLocationsURL: string | null,
    },
    pokedex: Record<string,Pokemon>
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export function initState(): State {
    return {
        rl: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > "
        }),
        pokeapi: new PokeAPI(1000 * 60),
        commands: getCommands(),
        map: {
            nextLocationsURL: null,
            prevLocationsURL: null,
        },
        pokedex: {}
    }
}