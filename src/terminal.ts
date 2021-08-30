import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { commands } from './commands';
import { keyActions } from "./keys/KeyActionController";
import { Utils as U } from './utils';

export class TerminalController {
    term: Terminal;
    curr_line: string = '';
    cursor: number = 0;
    horizArrows = '';
    entries: string[] = localStorage.getItem('entries')?.split(',') || [];
    entriesPointer: number = this.entries.length;
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
        const fit = new FitAddon();
        this.term.loadAddon(fit);

        this.setUser(localStorage.getItem('username'));
        this.setMachine('myPortfolio');
        this.setSeparator('>');
        this.setWelcome('Welcome to my portfolio!');

        this.term.open(document.getElementById('terminal')!);
        fit.fit();
        window.addEventListener('resize', () => fit.fit());

        this.term.write(this.welcome);
        this.nl();
        if (localStorage.getItem('username') != null) {
            this.loggedUser = true;
            this.writePrompt();
        } else {
            this.term.write('Write your name: ');
        }
        this.term.onKey((key) => {
            const action = keyActions[key.domEvent.key];
            if (action != null) {
                (new action(this)).processKey(key);
            } else if (key.domEvent.key === 'Delete') {
                //this.curr_line = this.curr_line.substr(0, this.cursor) + this.curr_line.substr(this.cursor+1);
                //this.term.write(this.curr_line.substr(this.cursor)+' '+this.horizArrows); // -> problem with buffer getting smaller but horizArrows being the same
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
        localStorage.setItem('entries', this.entries.join(','));
        this.curr_line = "";
        this.cursor = 0;
    }

    nl() {
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

    writePrompt(): void {
        if (this.curr_line !== '') {
            this.term.write(this.runCommand());
        }
        this.nl();
        this.term.write(this.user + '@' + this.machine + ' ' + this.separator + ' ');
        this.horizArrows = '';
    }

    eraseLine(): void {
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

    setUser(user: string|null) {
        if (user === null) return;
        this.user = `\x1B[1;32m${user}\x1B[0m`;
        localStorage.setItem('username', user);
    }

    private setMachine(machine: string = 'machine') {
        this.machine = `\x1B[1;94m${machine}\x1B[0m`;
    }
}
