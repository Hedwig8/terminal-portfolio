import { CommandConstructor } from "./Command";
import { HelpCommand } from "./HelpCommand";
import { Utils as U} from "../utils";
import { TerminalController } from "../terminal";
import { NameCommand } from "./NameCommand";
import { AgeCommand } from "./AgeCommand";
import { GithubCommand } from "./GithubCommand";
import { HomeCommand } from "./HomeCommand";
import { HobbiesCommand } from "./HobbiesCommand";
import { CuriositiesCommand } from "./CuriositiesCommand";
import { LanguageCommand } from "./LanguageCommand";
import { SkillsCommand } from "./SkillsCommand";
import { InterestsCommand } from "./InterestsCommand";

export const commands: {[key:string]: CommandConstructor}  = {
    'age': AgeCommand,
    'curiosities': CuriositiesCommand,
    'github': GithubCommand,
    'help': HelpCommand,
    'hobbies': HobbiesCommand,
    'home': HomeCommand,
    'interests': InterestsCommand,
    'languages': LanguageCommand,
    'name': NameCommand,
    'skills': SkillsCommand,
}

export class CommandsController {
    controller: TerminalController;

    constructor(controller: TerminalController) {
        this.controller = controller;
    }

    runCommand(currentLine: string):string {
        if (currentLine == '') {
            return '';
        }

        let [command, args] = this.splitCurrentLine(currentLine);

        if (command == '!!') {
            return this.runCommand(this.controller.entries[this.controller.entriesPointer - 1 ]);
        }

        this.controller.addEntry();

        if (commands.hasOwnProperty(command)) {
            return (new commands[command]).run(args);
        }
    
        // Error
        return `${U.error} ${U.command(command)} is not available. Run ${U.command('help')} for all available commands`;
    }

    private splitCurrentLine(currentLine: string): [string, string[]] {
        const index = currentLine.indexOf(' ');

        // command with no args
        if (index === -1) return [currentLine, []]

        // split command from args
        const command = currentLine.substr(0, index);
        const args = currentLine.substr(index + 1, currentLine.length).split(' ');
        return [command, args];
    }
}