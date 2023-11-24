import { Command } from 'commander';
import { timeArgument } from './arguments.js';
import {
  createTimeCardIfNotExists,
  showCheckedInMessage,
  showCheckedOutMessage,
  showCurrentMonthTimecards,
  showCurrentWeekTimecards,
  showTimecard,
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
  .hook('postAction', showCheckedInMessage);

program
  .command('check-out')
  .addArgument(timeArgument)
  .description('update end time of the current timecard record')
  .hook('preAction', validateInputTime)
  .hook('preAction', createTimeCardIfNotExists)
  .action(updateEndTime)
  .hook('postAction', showCheckedOutMessage);

program
  .command('today')
  .description('show current timecard info')
  .action(() => showTimecard());

program
  .command('week')
  .description('show current week timecards info')
  .action(showCurrentWeekTimecards)

program
  .command('month')
  .description('show current month timecards info')
  .action(showCurrentMonthTimecards)

program.parse(process.argv);
