import './style.css'
import {TerminalInterface} from './terminal';

new TerminalInterface({
  prompt: '\x1B[1;32manon\x1B[0m@\x1B[1;94mmyPortfolio\x1B[0m',
  separator: ' \x1B[1;31m>\x1B[0m',
  welcome: '\x1B[1mWelcome to my portfolio!\x1B[0m'
});