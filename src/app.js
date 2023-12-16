#!/usr/bin/env node

import {
  Command
} from 'commander';
import {
  timeArgument
} from './arguments/time.argument.js';
import {
  showCheckedInMessage,
  showCheckedOutMessage,
  showNewRecordMessage
} from './handlers/message.handlers.js';
import {
  validateInputTime, validateInputTimeRande
} from './handlers/time.handlers.js';
import {
  createTimeCardIfNotExists,
  createTimecardRecord,
  showCurrentMonthTimecards,
  showCurrentWeekTimecards,
  showTimecard,
  updateRecordEndTime,
  updateRecordStartTime
} from './handlers/timecard.handlers.js';

const program = new Command();

program
  .command('check-in')
  .addArgument(timeArgument)
  .description('update start time of the current timecard record')
  .hook('preAction', validateInputTime)
  .hook('preAction', createTimeCardIfNotExists)
  .action(updateRecordStartTime)
  .hook('postAction', showCheckedInMessage);

program
  .command('check-out')
  .addArgument(timeArgument)
  .description('update end time of the current timecard record')
  .hook('preAction', validateInputTime)
  .hook('preAction', createTimeCardIfNotExists)
  .action(updateRecordEndTime)
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

program
  .command('record')
  .argument('<start>', 'start time of the record')
  .argument('<end>', 'end time of the record')
  .description('create new timecard record')
  .hook('preAction', validateInputTimeRande)
  .hook('preAction', createTimeCardIfNotExists)
  .action(createTimecardRecord)
  .hook('postAction', showNewRecordMessage);

program.parse(process.argv);
