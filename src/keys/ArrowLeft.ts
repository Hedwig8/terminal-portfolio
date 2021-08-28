import { TerminalController } from "../terminal";
import { KeyActionInterface, KeyEvent } from "./KeyAction";

export class ArrowLeft implements KeyActionInterface {
    controller: TerminalController;
    constructor(controller:TerminalController) {
        this.controller = controller;
    }

    processKey(key: KeyEvent):void {
        if (this.controller.cursor <= 0) {
            return;
        }
        this.controller.cursor--;
        this.controller.term.write(key.key);
        this.controller.horizArrows += key.key;
    }
}
