import { Command } from 'commander';
import { timeArgument } from './arguments.js';
import {
  createTimeCardIfNotExists,
  displayCheckedInMessage,
  displayCheckedOutMessage,
  displayCurrentWeekTimecards,
  displayTimecard,
  updateEndTime,
  updateStartTime,
  validateInputTime
} from './handlers.js';

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

program
  .command('today')
  .description('show current timecard info')
  .action(() => displayTimecard());

program
  .command('week')
  .description('show current week timecards info')
  .action(displayCurrentWeekTimecards)

program.parse(process.argv);
