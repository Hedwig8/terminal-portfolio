import { CommandInterface } from "./Command";
import { Utils as U} from "../utils";

export class HobbiesCommand implements CommandInterface {
    help() {
        return 'A brief glimpse on some casual hobbies the engineer likes to do';
    }

    run(args:string[]) {
        const usage = `Run ${U.command('hobbies')} to get some of the hobbies`;
        if (args.length > 0) return `${U.error} Too many parameters passed\r\n${usage}`;
        return `- Casual (normally) online games with friends: CS:GO, Apex Legends, Valorant;\r\n- YouTube videos about general technology and engineering, games, sometimes to explore new tech and topics on software and programming world as this terminal itself;\r\n- play Volleybal, Football or Padel with friends;\r\n- reading books: mainly Ken Follett, sometimes about acquiring/developing hard/soft skills`;
    }
}