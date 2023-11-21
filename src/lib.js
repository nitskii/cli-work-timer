import { Argument } from 'commander';
import moment from 'moment';
import { saveData, data as timecards } from './data.js';

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  return `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;
};

export const timeArgument = new Argument(
    '[time]',
    'time to set, e.g. 19:31, 5:44 PM'
  )
  .default(
    getCurrentTime(),
    'current time'
  );

const isValidTime = time =>
  moment(time, 'H:mm', true).isValid() ||
  moment(time, 'h:mm A', true).isValid();

export const validateInputTime = command => {
  const [time] = command.processedArgs;

  if (time && !isValidTime(time)) {
    console.log('Invalid input time');

    process.exit(0);
  }
};

export const createTimeCardIfNotExists = async () => {
  const today = new Date().toLocaleDateString('uk-UA');

  if (!Object.keys(timecards).includes(today)) {
    timecards[today] = [{ start: null, end: null }];
  }

  await saveData();
};

export const updateStartTime = async time => {
  const today = new Date().toLocaleDateString('uk-UA');
  const currentRecord = timecards[today]
    .find(r => r.start === null || r.end === null);

  currentRecord
    ? currentRecord.start = time
    : timecards[today].push({ start: time, end: null });

  await saveData();
};

export const updateEndTime = async time => {
  const today = new Date().toLocaleDateString('uk-UA');
  const currentRecord = timecards[today]
    .find(r => r.start === null || r.end === null);

  currentRecord
    ? currentRecord.end = time
    : timecards[today].push({ start: null, end: time });
  
  await saveData();
};

export const displayCheckedInMessage = ({ processedArgs }) => {
  const [time] = processedArgs;

  console.log(`Checked in at ${time}`);
};

export const displayCheckedOutMessage = ({ processedArgs }) => {
  const [time] = processedArgs;

  console.log(`Checked out at ${time}`);
};
