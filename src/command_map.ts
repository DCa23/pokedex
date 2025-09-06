import { ShallowLocations } from "./pokeapi";
import { State } from "./state";

export async function commandMap(state: State): Promise<void> {
    const locations: ShallowLocations = await state.pokeapi.fetchLocations(state.map.nextLocationsURL);
    genericCommandMap(locations, state);
}

export async function commandMapb(state: State): Promise<void> {
    const locations: ShallowLocations = await state.pokeapi.fetchLocations(state.map.prevLocationsURL);
    genericCommandMap(locations, state);
}

export async function genericCommandMap(locations: ShallowLocations, state: State) {
    state.map.nextLocationsURL = locations.next;
    state.map.prevLocationsURL = locations.previous;
    for (const location of locations.results) {
        console.log(location.name);
    }
}