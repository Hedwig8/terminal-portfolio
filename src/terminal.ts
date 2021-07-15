import { Terminal } from "xterm";

type CommandRun = (args: string[]) => string;

interface Command {
    help: string;
    run: CommandRun;
};

interface CommandMap {
    [key: string]: Command
}

const commands: CommandMap = {
    a: {
        help: 'test command',
        run: (args) => {
            return 'hello there'
        }
    },
    name: {
        help: 'Name of the exceptional Software Engineer that develop this respectable portfolio as a terminal interface; -f for full name',
        run: (args) => {
            const usage = 'Run \x1B[93mname\x1B[0m to receive the name of the exceptional Software Engineer that developed this respectable portfolio as a terminal interface\r\n\t-f: returns full name';
            if (args.length > 1) return '\x1B[1;1;31mError:\x1B[0m Too many parameters passed\r\n'+usage;
            if (args.length === 1 && args[0] !== '-f') return '\x1B[1;1;31mError:\x1B[0m Wrong parameter passed\r\n'+usage;
            if (args.length === 1) return 'Henrique Maciel de Freitas';
            return 'Henrique Freitas';
        }
    },
    age: {
        help: 'Age, in years, of this website\'s big boss\r\n\t-b for birth day\r\n\t-M for age in months\r\n\t-w for age in weeks\r\n\t-d for age in days\r\n\t-h for age in hours\r\n\t-m for age in minutes\r\n\t-s for age in seconds',
        run: (args) => {
            const birthday = '1999-04-26 16:55:00 GMT-0';
            const seconds = Math.floor((new Date().getTime() - new Date(birthday).getTime())/1000);

            let minutes = (seconds:number) => Math.floor(seconds/60);
            let hours = (seconds:number) => Math.floor(minutes(seconds)/60);
            let days = (seconds:number) => Math.floor(hours(seconds)/24);
            let weeks = (seconds:number) => Math.floor(days(seconds)/7);
            let months = (seconds:number) => Math.floor(days(seconds)/30.44);
            let years = (seconds:number) => Math.floor(days(seconds)/365.25);

            const usage = 'Run \x1B[93mage\x1B[0m to receive the age, in years; more info running \x1B[93mhelp age\x1B[0m';
            if (args.length > 1) return '\x1B[1;1;31mError:\x1B[0m Too many parameters: only 1 parameter allowed\r\n'+usage;
            if (args.length === 1 && ['-b', '-M', '-w', '-d', '-h', '-m', '-s'].indexOf(args[0]) === -1) return '\x1B[1;1;31mError:\x1B[0m Wrong parameter passed\r\n'+usage;
            
            if (args.length === 1) {
                switch(args[0]) {
                    case '-b':
                        return new Date(birthday).toDateString();
                    case '-M':
                        return months(seconds)+' months';
                    case '-w':
                        return weeks(seconds)+' weeks';
                    case '-d':
                        return days(seconds)+' days';
                    case '-h':
                        return hours(seconds)+' hours';
                    case '-m':
                        return minutes(seconds)+' minutes';
                    case '-s':
                        return seconds + ' seconds';
                    default:
                        return '';
                }
            }
            return years(seconds)+' years';
        }
    },
    help: {
        help: "I need somebody\r\n(Help!) not just anybody\r\n(Help!) you know I need someone\r\nHeeeeelp!",
        run: (args) => {
            const usage = 'Run \x1B[93mhelp\x1B[0m to get all available commands\r\n\tOR\r\nRun \x1B[93mhelp <command>\x1B[0m to get a hint at command\'s usage';
            if (args.length > 1) return '\x1B[1;1;31mError:\x1B[0m Too many parameters passed\r\n'+usage;
            if (args.length === 1 && Object.getOwnPropertyNames(commands).indexOf(args[0]) === -1) 
                return `\x1B[1;1;31mError:\x1B[0m Command \x1B[93m${args[0]}\x1B[0m not available\r\n`+usage;
            if (args.length === 1) {
                return commands[args[0]].help;
            }
            return 'The available commands are: ' + Object.getOwnPropertyNames(commands).sort().join(', ') + '\r\nRun \x1B[93m<command>\x1B[0m or \x1B[93mhelp <command>\x1B[0m to get extra info';
        }
    },
    
}

interface TerminalArgs {
    prompt?: string;
    separator?: string;
    welcome?: string;
}

export class TerminalInterface {
    term: Terminal;
    curr_line: string = '';
    entries: string[] = [];
    prompt: string = 'TerminalInterface';
    separator: string = '$';
    welcome: string = 'Welcome to TerminalInterface';

    constructor(options?: TerminalArgs) {
        this.term = new Terminal({
            cursorBlink: true,
            cursorStyle: 'block'
        });
        this.prompt = options?.prompt || this.prompt;
        this.separator = options?.separator || this.separator;
        this.welcome = options?.welcome || this.welcome;

        this.term.open(document.getElementById('terminal'));

        this.term.write(this.welcome);
        this.writePrompt();

        this.term.onKey((key, ev) => {
            if (key.domEvent.key === "Enter") {
                this.entries.push(this.curr_line);
                this.nl();
                this.writePrompt();
            } else if (key.domEvent.key === 'Backspace') {
                this.curr_line = this.curr_line.slice(0, this.curr_line.length - 1);
                this.term.write("\b \b");
            } else {
                this.curr_line += key.key;
                this.term.write(key.key);
            }
        })
    }

    private nl() {
        this.term.write('\r\n');
    }

    private splitCurrLine(): [string, string[]] {
        const index = this.curr_line.indexOf(' ');

        // command with no args
        if (index === -1) return [this.curr_line, []]

        // split command from args
        const command = this.curr_line.substr(0, index);
        const args = this.curr_line.substr(index + 1, this.curr_line.length).split(' ');
        return [command, args]
    }

    private runCommand(): string {
        const [command, args] = this.splitCurrLine();

        if (commands.hasOwnProperty(command)) {
            return commands[command].run(args);
        }

        // Error
        return '\x1B[1;1;31mError:\x1B[0m Command not available';
    }

    private writePrompt(): void {
        if (this.curr_line !== '') {
            this.term.write(this.runCommand());
        }
        this.nl();
        this.term.write(this.prompt + this.separator + ' ');
        this.curr_line = "";
    }
}
