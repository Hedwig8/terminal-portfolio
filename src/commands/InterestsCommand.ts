import { CommandInterface } from "./Command";
import { Utils as U} from "../utils";

export class InterestsCommand implements CommandInterface {
    help() {
        return 'The personal interests in the very broad software development area';
    }

    run(args:string[]) {
        const usage = `Run ${U.command('interests')} to get an overall idea on the personal preference`;
        if (args.length > 0) return `${U.error} Too many parameters passed\r\n${usage}`;
        return 'Ranked on a 1-5 scale:\n\r5 - general Artificial Intelligence;\n\r  - Machine Learning (and MLOps);\n\r4 - Computer Vision;\n\r3 - Backend Development;\n\r  - Robotics and IOT;\n\r  - Games and Graphics;\n\r2 - DevOps;\n\r  - Frontend Development;\n\r  - Mobile Development;\n\r1 - Networking;\n\r  - Security;';
    }
}