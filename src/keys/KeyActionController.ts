import { ArrowLeft } from "./ArrowLeft";
import { ArrowRight } from "./ArrowRight";
import { BackSpace } from "./Backspace";
import { Enter } from "./Enter";
import { KeyActionConstructor } from "./KeyAction";

export const keyActions: {[key:string]: KeyActionConstructor} = {
    'Enter': Enter,
    'Backspace': BackSpace,
    'ArrowRight': ArrowRight,
    'ArrowLeft': ArrowLeft,
}
