export class Utils {
    static error = '\x1B[1;1;31mError:\x1B[0m';

    static command(command:string):string {
        return `\x1B[1;93m${command}\x1B[0m`;
    }
}