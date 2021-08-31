import { CommandInterface } from "./Command";
import { Utils as U} from "../utils";

export class SkillsCommand implements CommandInterface {
    help() {
        return 'All general skills that enables the engineer to be the ideal candidate for any position';
    }

    run(args:string[]) {
        const usage = `Run ${U.command('skills')} to get the skills the person has `;
        if (args.length > 0) return `${U.error} Too many parameters passed\r\n${usage}`;
        return 'Expert:\n\r\tStackOverflow and Google searching;\n\rProficient:\n\r\tC/C++ applied in Operating Systems;\n\r\tJava in Object Oriented Programming;\n\r\tPython in general usage;\n\r\tGit in version control and Github/Gitlab in collaborative projects;\n\r\tHTML/CSS/Vanilla JS in simple web pages;\n\r\tFlask (Py) in API;\n\r\tSQL in relational database;\n\rCompetent:\n\r\tLinux/GNU, mostly used Ubuntu;\n\r\tSpark used in Big Data and Machine Learning;\n\r\tTensorFlow/Keras in ML, either in courses projects and summer projects;\n\r\tOpenCV;\n\r\tUnity for game development;\n\r\tArduino for overall sensor data acquisition;\n\r\tReact and React Native (JS) for Progressive Web Apps;\n\rAdvanced Beginner:\n\r\tNode.js and Express for backend;\n\r\tDocker for project containerization;\n\r\tProlog used in dubious college courses;\n\r\tWebGL through WebCGF framework, provided by the course teachers;\n\r\tScheme was my first contact in college with coding, it is similar to LISP;\n\rNovice:\n\r\tpretty much any other technology';
    }
}