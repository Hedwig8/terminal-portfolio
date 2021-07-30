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
    cursor: number = 0;
    horizArrows = '';
    entries: string[] = [];
    entriesPointer: number = 0;
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

        this.term.open(document.getElementById('terminal')!);

        this.term.write(this.welcome);
        this.writePrompt();

        this.term.onKey((key) => {
            if (key.domEvent.key === "Enter") {
                this.entries.push(this.curr_line);
                this.entriesPointer = this.entries.length;
                this.nl();
                this.writePrompt();
            } else if (key.domEvent.key === 'Backspace' && this.cursor > 0) {
                this.curr_line = this.curr_line.substr(0, this.cursor-1) + this.curr_line.substr(this.cursor);
                this.cursor--;
                this.term.write("\b" + this.curr_line.substr(this.cursor) + ' \b' +this.horizArrows);
            } else if (key.domEvent.key === 'Delete') {
                //this.curr_line = this.curr_line.substr(0, this.cursor) + this.curr_line.substr(this.cursor+1);
                //this.term.write(this.curr_line.substr(this.cursor)+' '+this.horizArrows); // -> problem with buffer getting smaller but horizArrows being the same
            } else if (key.domEvent.key === 'ArrowRight' && this.cursor < this.curr_line.length) {
                this.cursor++;
                this.term.write(key.key);
                this.horizArrows += key.key;
            } else if (key.domEvent.key === 'ArrowLeft' && this.cursor > 0) {
                this.cursor--;
                this.term.write(key.key);
                this.horizArrows += key.key;
            } else if (key.domEvent.key === 'ArrowUp' && this.entriesPointer > 0) {
                this.entriesPointer--;
                this.eraseLine();
                this.curr_line = this.entries[this.entriesPointer];
                this.cursor = this.curr_line.length;
                this.term.write(this.curr_line);
            } else if (key.domEvent.key === 'ArrowDown' && this.entriesPointer < this.entries.length) {
                this.entriesPointer++;
                this.eraseLine();
                this.curr_line = this.entries[this.entriesPointer] || '';
                this.cursor = this.curr_line.length;
                this.term.write(this.curr_line);
            } else if (key.domEvent.key.length === 1) {
                this.entriesPointer = this.entries.length;
                this.curr_line = this.curr_line.substr(0, this.cursor) + key.key + this.curr_line.substr(this.cursor);
                this.cursor++;
                this.term.write(key.key + this.curr_line.substr(this.cursor) + this.horizArrows);
            }
        })
        this.term.focus();
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

        if (command == 'clear') {
            this.term.clear();
            return '';
        }

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
        this.cursor = 0;
        this.horizArrows = '';
    }

    private eraseLine(): void {
        for (let _ of this.curr_line)
            this.term.write('\b \b');
        this.curr_line = '';
        this.cursor = 0;
        this.horizArrows = '';
    }
}
