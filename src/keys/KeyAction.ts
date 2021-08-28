import { TerminalController } from "../terminal"

export interface KeyActionConstructor {
    new (controller: TerminalController): KeyActionInterface;
}

export interface KeyEvent {
    key: string,
    domEvent: KeyboardEvent
}

export interface KeyActionInterface {
    controller: TerminalController;
    processKey: (key: KeyEvent) => void;
}
