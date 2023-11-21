import { Command } from 'commander';
import {
  createTimeCardIfNotExists,
  displayCheckedInMessage,
  displayCheckedOutMessage,
  timeArgument,
  updateEndTime,
  updateStartTime,
  validateInputTime
} from './lib.js';

const program = new Command();

program
  .command('check-in')
  .addArgument(timeArgument)
  .description('update start time of the current timecard record')
  .hook('preAction', validateInputTime)
  .hook('preAction', createTimeCardIfNotExists)
  .action(updateStartTime)
  .hook('postAction', displayCheckedInMessage);

program
  .command('check-out')
  .addArgument(timeArgument)
  .description('update end time of the current timecard record')
  .hook('preAction', validateInputTime)
  .hook('preAction', createTimeCardIfNotExists)
  .action(updateEndTime)
  .hook('postAction', displayCheckedOutMessage);

program.parse(process.argv);