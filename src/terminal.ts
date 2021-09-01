import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { keyActions } from "./keys/KeyActionController";

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
        this.setWelcome('Welcome to my terminal portfolio!\n\n\rThe idea of using a custom terminal in a webpage originated when planning for a project that turned out to be too ambitious for a couple of summer months, that is mostly spent enjoying sea and nature activities;\n\n\rUnnecessary to point out, this also revealed to be more laborious than antecipated;\n\rWhen searching and trying a few libraries of already-implemented JS terminals, each one of them had some limitation, being the lack of custom styles, not dealing with keypresses the way it was intended or not dealing with keypresses at all;\n\n\rFinally, the library xterm.js was the one that seemed the least compromised, with a simple style, the possibility of coloring letter and also used in other platforms, like VSCode;\n\rLater this decision was a little questioned because sometimes it was hard to implement some intended features, as this works as similar to a real terminal as I could tell;\n\n\rIn the end, the result is satisfiable, with some future improvements planned;');

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

    addEntry() {
        this.entries.push(this.curr_line);
        this.entriesPointer = this.entries.length;
        localStorage.setItem('entries', this.entries.join(','));
        this.curr_line = "";
        this.cursor = 0;
    }

    nl() {
        this.term.write('\r\n');
    }

    writePrompt(): void {
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
