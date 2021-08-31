import { TerminalController } from "../terminal";
import { KeyActionInterface } from "./KeyAction";

export class BackSpace implements KeyActionInterface {
    controller: TerminalController;
    constructor(controller:TerminalController) {
        this.controller = controller;
    }

    processKey():void {
        if (this.controller.cursor <= 0) {
            return;
        }
        this.controller.curr_line = this.controller.curr_line.substr(0, this.controller.cursor - 1) + this.controller.curr_line.substr(this.controller.cursor);
        this.controller.cursor--;
        this.controller.term.write("\b" + this.controller.curr_line.substr(this.controller.cursor) + ' \b' + this.controller.horizArrows);
    }
}
