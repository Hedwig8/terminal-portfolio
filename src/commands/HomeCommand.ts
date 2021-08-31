import { CommandInterface } from "./Command";
import { Utils as U} from "../utils";

export class HomeCommand implements CommandInterface {
    help() {
        return 'The (is)land where this individual was born and raised from boy to man';
    }

    run(args:string[]) {
        const usage = `Run simply ${U.command('home')} to get home location`;
        if (args.length > 0) return `${U.error} Too many parameters passed\r\n${usage}`;
        return '/Europe/Portugal/Azores/Flores\\ Island';
    }
}