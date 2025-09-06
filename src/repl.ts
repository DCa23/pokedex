import { commandMap, commandMapb } from './command_map.js';
import { exploreCommand } from './command_explore.js';
import { CLICommand, initState, type State } from './state.js';
import { catchCommand,commandInspect, commandPokedex } from './command_pokemon.js';

export function cleanInput(input: string): string[] {
    return input.toLocaleLowerCase().trim().split(' ').filter(val => val !== "");
}

export function startREPL(): void {
    const state = initState();
    const commands = getCommands();

    console.log("Welcome to the Pokedex!");
    state.rl.prompt();

    state.rl.on('line', async (line: string) => {
        let userInput = cleanInput(line);
        if (userInput.length > 0) {
            const userCommand = userInput.shift()!;
            const cmd = commands[userCommand];
            if (cmd) {
                try {
                    await cmd.callback(state, ...userInput);
                } catch (e) {
                    console.log(e);
                }
            } else {
                console.log("Unknown command");
            }
        }
        state.rl.prompt();
    });
}

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Shows the next 20 location",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Shows the previous 20 location",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "Allows you to explore a location, and displays it's pokemons. Takes location as a argument",
            callback: exploreCommand
        },
        catch: {
            name: "catch",
            description: "Tries to catch a pokemon, Takes pokemon name as argument",
            callback: catchCommand
        },
        inspect: {
            name: "inspect",
            description: "Gets the details of a pokemon you have captured",
            callback: commandInspect
        },
        pokedex: {
            name: "pokedex",
            description: "Displays all your caputred pokemons",
            callback: commandPokedex
        },
    }
}



export async function commandExit(state: State): Promise<void> {
    console.log('Closing the Pokedex... Goodbye!');
    state.rl.close();
    process.exit(0);
}

export async function commandHelp(state: State): Promise<void> {
    console.log();
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log();
    // Alternative implementation, less readable?
    // for (const command in commands) {
    //     console.log(commands[command].name + ": " + commands[command].description);
    // }
    // for (const [name, command] of Object.entries(state.commands)) {
    //     console.log(command.name + ": " + command.description);
    // }
    // This is the implementation of boot.dev i think is sharper than mine
    for (const cmd of Object.values(state.commands)) {
        console.log(`${cmd.name}: ${cmd.description}`);
    }
    console.log();
}