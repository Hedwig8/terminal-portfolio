import {Utils as U} from './utils';

type CommandRun = (args: string[]) => string;

interface Command {
    help: string;
    run: CommandRun;
};

interface CommandMap {
    [key: string]: Command
}

const commands: CommandMap = {
    a: {
        help: 'test command',
        run: (args) => {
            return 'hello there'
        }
    },
    name: {
        help: 'Name of the exceptional Software Engineer that develop this respectable portfolio as a terminal interface; -f for full name',
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
            return '/Europe/Portugal/Azores/Flores\\ Island';
        }
    },
}

export default commands;