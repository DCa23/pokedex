
import { State } from "./state";


export async function exploreCommand(state: State, ...args: string[]): Promise<void> {
    if (args.length < 1 ){
        console.log("You have to provide 1 zone as an argument");
        return;
    }

    const locationDetails = await state.pokeapi.fetchLocation(args[0]);
    for (const pokemon_encounter of locationDetails.pokemon_encounters ) {
        console.log(`- ${pokemon_encounter.pokemon.name}`);
    }
}