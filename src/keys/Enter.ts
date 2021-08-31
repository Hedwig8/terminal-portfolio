import { TerminalController } from "../terminal";
import { KeyActionInterface } from "./KeyAction";
import { Utils as U } from "../utils";
import { CommandsController } from "../commands/CommandsController";

export class Enter implements KeyActionInterface {
    controller: TerminalController;
    constructor(controller:TerminalController) {
        this.controller = controller;
    }

    processKey():void {
        if (this.controller.loggedUser) {
            this.controller.nl()
        } else {
            if (this.controller.curr_line == '') {
                this.controller.term.write(U.errorMessage('Please provide a valid name!\n\r'));
                return;
            }
            this.controller.setUser(this.controller.curr_line);
            this.controller.term.write('\n\rGreetings ' + U.successMessage(this.controller.curr_line));
            this.controller.curr_line = '';
            this.controller.cursor = 0;
            this.controller.loggedUser = true;
        }
        this.controller.term.write((new CommandsController(this.controller)).runCommand(this.controller.curr_line));
        this.controller.writePrompt();
    }
}
