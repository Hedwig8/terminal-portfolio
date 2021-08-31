import { CommandInterface } from "./Command";
import { Utils as U} from "../utils";

export class GithubCommand implements CommandInterface {
    help() {
        return 'Best Github page you\'ll ever experience';
    }

    run(args:string[]) {
        const usage = `Run simply ${U.command('github')} to get the nickname`;
        if (args.length > 0) return `${U.error} Too many parameters passed\r\n${usage}`;
        return 'Hedwig8';
    }
}