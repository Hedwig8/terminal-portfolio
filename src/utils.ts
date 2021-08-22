export class Utils {
    static error = '\x1B[1;1;31mError:\x1B[0m';

    static command(command:string):string {
        return `\x1B[1;93m${command}\x1B[0m`;
    }

    static errorMessage(message:string):string {
        return `\x1b[1;1;31m${message}\x1b[0m`;
    }

    static successMessage(message:string):string {
        return `\x1b[1;1;32m${message}\x1b[0m`;
    }
}