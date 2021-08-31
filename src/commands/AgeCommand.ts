import { CommandInterface } from "./Command";
import { Utils as U} from "../utils";

export class AgeCommand implements CommandInterface {
    help() {
        return 'Age, in years, of this website\'s big boss\r\n\t-b for birth day\r\n\t-M for age in months\r\n\t-w for age in weeks\r\n\t-d for age in days\r\n\t-h for age in hours\r\n\t-m for age in minutes\r\n\t-s for age in seconds';
    }

    run(args:string[]) {
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
}