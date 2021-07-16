import { Terminal } from "xterm";
import commands from './commands';
import {Utils as U} from './utils';

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
        return `${U.error} ${U.command(command)} is not available. Run ${U.command('help')} for all available commands`;
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
