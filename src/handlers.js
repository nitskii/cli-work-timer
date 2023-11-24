import { saveData, data as timecards } from './data.js';
import {
  currentDate,
  currentMonth,
  currentWeek,
  currentYear,
  isValidTime,
  minutesToDuration,
  timeRangeToMinutes
} from './time.js';

export const validateInputTime = ({ processedArgs }) => {
  const [ time ] = processedArgs;

  if (isValidTime(time)) return;

  console.log('Invalid input time');
  process.exit(0);
};

export const createTimeCardIfNotExists = async () => {
  if (!Object.keys(timecards).includes(currentDate)) {
    timecards[currentDate] = [{
      start: null,
      end: null,
      week: currentWeek,
      month: currentMonth,
      year: currentYear
    }];
  }
};

export const updateStartTime = async time => {
  const currentRecord = timecards[currentDate]
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
    timecards[currentDate].push({ start: time, end: null });
  }

  await saveData();
};

export const showCheckedInMessage = ({ processedArgs }) => {
  const [ time ] = processedArgs;

  console.log(`Checked in at ${time}`);
};

export const updateEndTime = async time => {
  const currentRecord = timecards[currentDate]
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
      timecards[currentDate].push({ start: null, end: time });
    }
  
    await saveData();
};''

export const showCheckedOutMessage = ({ processedArgs }) => {
  const [ time ] = processedArgs;

  console.log(`Checked out at ${time}`);
};

const showTimecardRecord = (record, index) => {
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

export const showTimecard = (date = currentDate) => {
  const records = timecards[date];
  
  console.log(`${date}:`);

  if (!records) {
    console.log('No records');

    return;
  }

  records.forEach(showTimecardRecord);
};

export const showCurrentWeekTimecards = () => {
  for (let [date, records] of Object.entries(timecards)) {
    if (records.some(r => r.week === currentWeek && r.year === currentYear)) {
      showTimecard(date);
      console.log();
    }
  }
};

export const showCurrentMonthTimecards = () => {
  for (let [date, records] of Object.entries(timecards)) {
    if (records.some(r => r.month === currentMonth && r.year === currentYear)) {
      showTimecard(date);
      console.log();
    }
  }
};
