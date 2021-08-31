import { CommandInterface } from "./Command";
import { Utils as U} from "../utils";

export class LanguageCommand implements CommandInterface {
    help() {
        return 'The languages the person can speak';
    }

    run(args:string[]) {
        const usage = `Run ${U.command('languages')} to get languages the person speaks `;
        if (args.length > 0) return `${U.error} Too many parameters passed\r\n${usage}`;
        return 'Native Portuguese; Fluent English';
    }
}