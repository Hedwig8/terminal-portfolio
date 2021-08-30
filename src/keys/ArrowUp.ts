import { TerminalController } from "../terminal";
import { KeyActionInterface } from "./KeyAction";

export class ArrowUp implements KeyActionInterface {
    controller: TerminalController;
    constructor(controller:TerminalController) {
        this.controller = controller;
    }

    processKey():void {
        if (this.controller.entriesPointer <= 0) {
            return;
        }
        this.controller.entriesPointer--;
        this.controller.eraseLine();
        this.controller.curr_line = this.controller.entries[this.controller.entriesPointer];
        this.controller.cursor = this.controller.curr_line.length;
        this.controller.term.write(this.controller.curr_line);
    }
}
