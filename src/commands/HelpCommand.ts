import { commands } from "./CommandsController";
import { CommandInterface } from "./Command";
import { Utils as U} from "../utils";

export class HelpCommand implements CommandInterface {
    constructor() {

    }

    help() {
        return 'I need somebody\r\n(Help!) not just anybody\r\n(Help!) you know I need someone\r\nHeeeeelp!';
    }

    run(args:string[]) {
        const usage = `Run ${U.command('help')} for all available commands\r\n\tOR\r\nRun ${U.command('help <command>')} to get a hint at command\'s usage`;
        if (args.length > 1) return `${U.error} Too many parameters passed\r\n${usage}`;
        if (args.length === 1 && Object.getOwnPropertyNames(commands).indexOf(args[0]) === -1)
            return `${U.error} Command ${U.command(args[0])} not available\r\n${usage}`;
        if (args.length === 1) {
            return (new commands[args[0]]).help();
        }
        return `The available commands are: ${Object.getOwnPropertyNames(commands).sort().join(', ')}\r\nRun ${U.command('<command>')} or ${U.command('help <command>')} to get extra info`;
    }
}