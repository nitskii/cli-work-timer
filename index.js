import { Command } from 'commander';
import {
  getCurrentTime,
  validateInputTime
} from './lib.js';

const program = new Command();

program
  .command('check-in')
  .argument('[time]')
  .description('')
  .hook('preAction', validateInputTime)
  .action(time => {
    console.log(
      `Checked in at ${time ?? getCurrentTime()}`
    );
  });

program
  .command('check-out')
  .argument('[time]')
  .description('')
  .hook('preAction', validateInputTime)
  .action(time => {
    console.log(
      `Checked out at ${time ?? getCurrentTime()}`
    );
  });

program.parse(process.argv);
