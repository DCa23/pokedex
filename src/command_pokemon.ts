
import { Pokemon } from "./pokeapi";
import { State } from "./state";


export async function catchCommand(state: State, ...args: string[]): Promise<void> {
    if (args.length < 1 ){
        console.log("You have to provide 1 pokemon as an argument");
        return;
    }
    const pokeName = args[0];
    console.log(`Throwing a Pokeball at ${pokeName}...`);

    const pokemon = await state.pokeapi.fetchPokemon(pokeName);
    const chancesOfCapturing = getRandomInt(400);
    if (pokemon.base_experience <=  chancesOfCapturing) {
        console.log(`${pokeName} was caught!`);
        state.pokedex[pokeName] = pokemon;
        return;
    }
    console.log(`${pokeName} escaped!`);
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}


export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    if (args.length < 1 ){
        console.log("You have to provide 1 zone as an argument");
        return;
    }

    if (!state.pokedex[args[0]]) {
        console.log("you have not caught that pokemon")
        return;
    }

    const pokemon: Pokemon = state.pokedex[args[0]];

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats:`);
    for( const stat of pokemon.stats) {
        console.log(`\t-${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log(`Types:`);
    for( const type of pokemon.types) {
        console.log(`\t- ${type.type.name}`);
    }
}

export async function commandPokedex(state: State): Promise<void> {
    if(Object.keys(state.pokedex).length === 0) {
        console.log("You haven't caputred any pokemon yet")
    }

    console.log("Your Pokedex:");
    for (const pokemon in state.pokedex) {
        console.log(`\t - ${pokemon}`);
    }
}