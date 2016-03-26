import 'babel-polyfill';
import program from 'commander';
import { commands } from './commands';

const VERSION = '0.0.1';

program
  .version(VERSION);

commands.forEach((command) => {
  command.register(program);
});

program.parse(process.argv);
