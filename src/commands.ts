import {Utils as U} from './utils';

type CommandRun = (args: string[]) => string;

interface Command {
    help: string;
    run: CommandRun;
};

interface CommandMap {
    [key: string]: Command
}

export const commands: CommandMap = {
    a: {
        help: 'test command',
        run: () => {
            return 'hello there'
        }
    },
    name: {
        help: 'Name of the exceptional Software Engineer that develop this respectable portfolio as a terminal interface;\r\n\t-f for full name',
        run: (args) => {
            const usage = `Run ${U.command('name')} to receive the name of the exceptional Software Engineer that developed this respectable portfolio as a terminal interface\r\n\t-f: returns full name`;
            if (args.length > 1) return `${U.error} Too many parameters passed\r\n${usage}`;
            if (args.length === 1 && args[0] !== '-f') return `${U.error} Wrong parameter passed\r\n${usage}`;
            if (args.length === 1) return 'Henrique Maciel de Freitas';
            return 'Henrique Freitas';
        }
    },
    age: {
        help: 'Age, in years, of this website\'s big boss\r\n\t-b for birth day\r\n\t-M for age in months\r\n\t-w for age in weeks\r\n\t-d for age in days\r\n\t-h for age in hours\r\n\t-m for age in minutes\r\n\t-s for age in seconds',
        run: (args) => {
            const birthday = '1999-04-26 16:55:00 GMT-0';
            const seconds = Math.floor((new Date().getTime() - new Date(birthday).getTime()) / 1000);

            let minutes = (seconds: number) => Math.floor(seconds / 60);
            let hours = (seconds: number) => Math.floor(minutes(seconds) / 60);
            let days = (seconds: number) => Math.floor(hours(seconds) / 24);
            let weeks = (seconds: number) => Math.floor(days(seconds) / 7);
            let months = (seconds: number) => Math.floor(days(seconds) / 30.44);
            let years = (seconds: number) => Math.floor(days(seconds) / 365.25);

            const usage = `Run ${U.command('age')} to receive the age, in years; more info running ${U.command('help age')}`;
            if (args.length > 1) return `${U.error} Too many parameters: only 1 parameter allowed\r\n${usage}`;
            if (args.length === 1 && ['-b', '-M', '-w', '-d', '-h', '-m', '-s'].indexOf(args[0]) === -1) return `${U.error} Wrong parameter passed\r\n${usage}`;

            if (args.length === 1) {
                switch (args[0]) {
                    case '-b':
                        return new Date(birthday).toDateString();
                    case '-M':
                        return months(seconds) + ' months';
                    case '-w':
                        return weeks(seconds) + ' weeks';
                    case '-d':
                        return days(seconds) + ' days';
                    case '-h':
                        return hours(seconds) + ' hours';
                    case '-m':
                        return minutes(seconds) + ' minutes';
                    case '-s':
                        return seconds + ' seconds';
                    default:
                        return '';
                }
            }
            return years(seconds) + ' years';
        }
    },
    help: {
        help: "I need somebody\r\n(Help!) not just anybody\r\n(Help!) you know I need someone\r\nHeeeeelp!",
        run: (args) => {
            const usage = `Run ${U.command('help')} for all available commands\r\n\tOR\r\nRun ${U.command('help <command>')} to get a hint at command\'s usage`;
            if (args.length > 1) return `${U.error} Too many parameters passed\r\n${usage}`;
            if (args.length === 1 && Object.getOwnPropertyNames(commands).indexOf(args[0]) === -1)
                return `${U.error} Command ${U.command(args[0])} not available\r\n${usage}`;
            if (args.length === 1) {
                return commands[args[0]].help;
            }
            return `The available commands are: ${Object.getOwnPropertyNames(commands).sort().join(', ')}\r\nRun ${U.command('<command>')} or ${U.command('help <command>')} to get extra info`;
        }
    },
    github: {
        help: 'Github account username',
        run: (args) => {
            const usage = `Run simply ${U.command('github')} to get the nickname`;
            if (args.length > 0) return `${U.error} Too many parameters passed\r\n${usage}`;
            return 'Hedwig8';
        }
    },
    home: {
        help: 'The (is)land where the boy was born and raised',
        run: (args) => {
            const usage = `Run simply ${U.command('home')} to get home location`;
            if (args.length > 0) return `${U.error} Too many parameters passed\r\n${usage}`;
            return '/Europe/Portugal/Azores/Flores\\ Island';
        }
    },
    hobbies: {
        help: 'A brief glimpse on some casual hobbies the engineer likes to do',
        run: (args) => {
            const usage = `Run ${U.command('hobbies')} to get some of the hobbies`;
            if (args.length > 0) return `${U.error} Too many parameters passed\r\n${usage}`;
            return '- Online games with friends: CS:GO, Apex Legends, Valorant;\r\n- YouTube videos about general technology and engineering, games, sometimes to explore new tech and topics on software and programming world;\r\n- play Volleybal, Football or Padel with friends;\r\n- reading books: mainly Ken Follett, sometimes about acquiring/developing hard/soft skills';
        }
    },
    curiosities: {
        help: 'Some personal curiosities shared by the author\r\n\t--list for complete list of curiosities',
        run: (args) => {
            const facts = [
                'My first programming experience was in a high school project, CanSat, using Arduino to program a small can-sized satellite',
                'I played federated Volleyball for over 10 years in my local club, and got the chance to compete twice for the final national championship',
                'I hate Java for being too verbose and over-engineered in some aspects',
                'My favorite language is Python for its close relationship with Big Data, Artificial Intelligence and Machine Learning, plus can be used in backend',
                'In my free time, I like to have great ideas, that I later discover to be too time and/or money costly. Sometimes I reduce the size of the project so I can build it',
                'This portfolio started as a 3D-game-styled interface and a terminal to interact with the main player',
            ];
            const usage = `${U.command('curiosities')} returns a random fact about the author; ${U.command('curiosities --list')} for all of them`;
            if (args.length > 1) return `${U.error} Too many parameters passed\r\n${usage}`;
            if (args.length === 1 && args[0] !== '--list') return `${U.error} Wrong parameter passed\r\n${usage}`;
            if (args.length === 1) return '- ' + facts.join('\r\n- ');
            return facts[Math.floor(Math.random()*facts.length)];
        }
    },
    languages: {
        help: 'The languages the person can speak',
        run: (args) => {
            const usage = `Run ${U.command('languages')} to get languages the person speaks `;
            if (args.length > 0) return `${U.error} Too many parameters passed${usage}`;
            return 'Native Portuguese; Fluent English';
        }
    },
    skills: {// TBD
        help: '',
        run: () => {
            return 'TBD';
        }
    },
    interests: { // TBD
        help: '',
        run: () => {
            return 'TBD';
        }
    },
}