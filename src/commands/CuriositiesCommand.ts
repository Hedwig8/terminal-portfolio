import { CommandInterface } from "./Command";
import { Utils as U} from "../utils";

export class CuriositiesCommand implements CommandInterface {
    help() {
        return 'Some personal curiosities shared by the author\r\n\t--list for complete list of curiosities';
    }

    run(args:string[]) {
        const facts = [
            'My first programming experience was in a high school project, CanSat, using Arduino to program a small can-sized satellite',
            'I played federated Volleyball for over 10 years in my local club, and got the chance to compete twice for the final national championship',
            'I specifically don\'t like Java for being too verbose and over-engineered in some aspects',
            'My favorite language is Python for its close relationship with Big Data, Artificial Intelligence and Machine Learning, plus can be used in backend',
            'In my free time, I like to have great ideas, that I later discover to be too time and/or money costly. Sometimes I reduce the size of the project so I can build it',
            'This portfolio started as a 3D-game-styled interface with a terminal as a controller to control the main player',
        ];
        const usage = `${U.command('curiosities')} returns a random fact about the author; ${U.command('curiosities --list')} for all of them`;
        if (args.length > 1) return `${U.error} Too many parameters passed\r\n${usage}`;
        if (args.length === 1 && args[0] !== '--list') return `${U.error} Wrong parameter passed\r\n${usage}`;
        if (args.length === 1) return '- ' + facts.join('\r\n- ');
        return facts[Math.floor(Math.random()*facts.length)];
    }
}