import { Terminal } from "xterm";
import commands from './commands';
import {Utils as U} from './utils';

export class TerminalInterface {
    term: Terminal;
    curr_line: string = '';
    cursor: number = 0;
    horizArrows = '';
    entries: string[] = [];
    entriesPointer: number = 0;
    user: string = '';
    machine: string = '';
    separator: string = '';
    welcome: string = '';
    loggedUser: boolean = false;

    constructor() {
        this.term = new Terminal({
            cursorBlink: true,
            cursorStyle: 'block',
            theme: {
                background: '#222',
            },
        });
        this.setUser(localStorage.getItem('username'));
        this.setMachine('myPortfolio');
        this.setSeparator('>');
        this.setWelcome('Welcome to my portfolio!');

        this.term.open(document.getElementById('terminal')!);

        this.term.write(this.welcome);
        this.nl();
        if (localStorage.getItem('username') != null) {
            this.loggedUser = true;
            this.writePrompt();
        } else {
            this.term.write('Write your name: ');
        }
        this.term.onKey((key) => {
            if (key.domEvent.key === "Enter") {
                if (!this.loggedUser) {
                    if (this.curr_line == '') {
                        this.term.write(U.errorMessage('Please provide a valid name!\n\r'));
                        return;
                    }
                    this.setUser(this.curr_line);
                    this.term.write('\n\rGreetings '+ U.successMessage(this.curr_line));
                    this.curr_line = '';
                    this.cursor = 0;
                    this.loggedUser = true;
                } else {
                    this.nl();
                }
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

    private addEntry() {
        this.entries.push(this.curr_line);
        this.entriesPointer = this.entries.length;
        this.curr_line = "";
        this.cursor = 0;
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
        let [command, args] = this.splitCurrLine();

        this.addEntry();

        if (command == 'clear') {
            this.term.clear();
            return '';
        } else if (command == '!!') {
            this.entries[this.entriesPointer-1] = this.entries[this.entriesPointer-2];
            console.log(this.entries, this.entriesPointer);
            command = this.entries[this.entriesPointer-1];
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
        this.term.write(this.user + '@' + this.machine + ' ' + this.separator + ' ');
        this.horizArrows = '';
    }

    private eraseLine(): void {
        for (let _ of this.curr_line)
            this.term.write('\b \b');
        this.curr_line = '';
        this.cursor = 0;
        this.horizArrows = '';
    }

    private setSeparator(sep: string = '$') {
        this.separator = `\x1b[1;31m${sep}\x1b[0m`;
    }

    private setWelcome(welcome: string = 'Welcome to TerminalInterface') {
        this.welcome = `\x1b[1m${welcome}\x1b[0m`;
    }

    private setUser(user: string|null) {
        if (user === null) return;
        this.user = `\x1B[1;32m${user}\x1B[0m`;
        localStorage.setItem('username', user);
    }

    private setMachine(machine: string = 'machine') {
        this.machine = `\x1B[1;94m${machine}\x1B[0m`;
    }
}
