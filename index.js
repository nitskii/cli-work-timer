import { Command } from 'commander';
import {
  createTimeCardIfNotExists,
  displayCheckedInMessage,
  displayCheckedOutMessage,
  updateEndTime,
  updateStartTime,
  validateInputTime
} from './lib.js';

const program = new Command();

program
  .command('check-in')
  .argument('[time]')
  .description('')
  .hook('preAction', validateInputTime)
  .hook('preAction', createTimeCardIfNotExists)
  .action(updateStartTime)
  .hook('postAction', displayCheckedInMessage);

program
  .command('check-out')
  .argument('[time]')
  .description('')
  .hook('preAction', validateInputTime)
  .hook('preAction', createTimeCardIfNotExists)
  .action(updateEndTime)
  .hook('postAction', displayCheckedOutMessage);

program.parse(process.argv);
