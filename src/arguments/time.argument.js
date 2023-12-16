import { Argument } from 'commander';
import { getCurrentTime } from '../time.js';

export const timeArgument = new Argument(
  '[time]',
  'time to set, e.g. 19:31, 5:44 PM'
).default(
  getCurrentTime(),
  'current time'
);
