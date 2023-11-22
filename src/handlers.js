import { saveData, data as timecards } from './data.js';
import {
  isValidTime,
  minutesToDuration,
  timeRangeToMinutes,
  today
} from './time.js';

export const validateInputTime = ({ processedArgs }) => {
  const [ time ] = processedArgs;

  if (isValidTime(time)) return;

  console.log('Invalid input time');
  process.exit(0);
};

export const createTimeCardIfNotExists = async () => {
  if (!Object.keys(timecards).includes(today)) {
    timecards[today] = [{ start: null, end: null }];
  }
};

export const updateStartTime = async time => {
  const currentRecord = timecards[today]
    .find(r => r.start === null || r.end === null);

  if (currentRecord) {
    currentRecord.start = time;

    const isRecordComplete = currentRecord.start && currentRecord.end;

    if (isRecordComplete) {
      currentRecord.minutes = timeRangeToMinutes(
        currentRecord.start,
        currentRecord.end
      );
    }
  } else {
    timecards[today].push({ start: time, end: null });
  }

  await saveData();
};

export const displayCheckedInMessage = ({ processedArgs }) => {
  const [ time ] = processedArgs;

  console.log(`Checked in at ${time}`);
};

export const updateEndTime = async time => {
  const currentRecord = timecards[today]
    .find(r => r.start === null || r.end === null);

    if (currentRecord) {
      currentRecord.end = time;
  
      const isRecordComplete = currentRecord.start && currentRecord.end;
  
      if (isRecordComplete) {
        currentRecord.minutes = timeRangeToMinutes(
          currentRecord.start,
          currentRecord.end
        );
      }
    } else {
      timecards[today].push({ start: null, end: time });
    }
  
    await saveData();
};

export const displayCheckedOutMessage = ({ processedArgs }) => {
  const [ time ] = processedArgs;

  console.log(`Checked out at ${time}`);
};

const displayTimecardRecord = (record, index) => {
  console.log(
    `${index + 1}. ` +
    `${record.start && record.start.length == 4 ? ' ' : ''}` +
    `${record.start || '  N/A'}` +
    ' - ' +
    `${record.end && record.end.length == 4 ? ' ' : ''}` +
    `${record.end || '  N/A'}` + 
    (
      record.minutes
        ? `, ${minutesToDuration(record.minutes)}`
        : ''
    )
  );
};

export const displayTimecard = (date = today) => {
  const records = timecards[date];
  
  console.log(`${date}:`);

  if (!records) {
    console.log('No records yet');

    return;
  }

  records.forEach(displayTimecardRecord);
};
