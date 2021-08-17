import './style.css'
import {TerminalInterface} from './terminal';

new TerminalInterface({
  user: 'anon',
  machine: 'myPortfolio',
  separator: '>',
  welcome: 'Welcome to my portfolio!'
});
