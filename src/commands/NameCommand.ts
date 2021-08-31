import { CommandInterface } from "./Command";
import { Utils as U} from "../utils";

export class NameCommand implements CommandInterface {
    help() {
        return 'Name of the exceptional Software Engineer that develop this respectable portfolio as a terminal interface;\r\n\t-f for full name';
    }

    run(args:string[]) {
        const usage = `Run ${U.command('name')} to receive the name of the exceptional Software Engineer that developed this respectable portfolio as a terminal interface\r\n\t-f: returns full name`;
        if (args.length > 1) return `${U.error} Too many parameters passed\r\n${usage}`;
        if (args.length === 1 && args[0] !== '-f') return `${U.error} Wrong parameter passed\r\n${usage}`;
        if (args.length === 1) return 'Henrique Maciel de Freitas';
        return 'Henrique Freitas';
    }
}