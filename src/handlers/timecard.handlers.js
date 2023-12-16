import chalk from "chalk";
import {
  saveData,
  data as timecards
} from "../lib/data.js";
import {
  CURRENT_DATE,
  CURRENT_MONTH,
  CURRENT_WEEK,
  CURRENT_YEAR,
  minutesToDuration,
  timeStringToMinutes
} from "../lib/time.js";

export const createTimeCardIfNotExists = async () => {
  if (!Object.keys(timecards).includes(CURRENT_DATE)) {
    timecards[CURRENT_DATE] = [{
      start: null,
      end: null,
      week: CURRENT_WEEK,
      month: CURRENT_MONTH,
      year: CURRENT_YEAR
    }];
  }
};

export const updateStartTime = async time => {
  const currentRecord = timecards[CURRENT_DATE]
    .find(r => r.start === null || r.end === null);

  if (currentRecord) {
    currentRecord.start = time;

    const isRecordComplete = currentRecord.start && currentRecord.end;

    if (isRecordComplete) {
      const startMinutes = timeStringToMinutes(currentRecord.start);
      const endMinutes = timeStringToMinutes(currentRecord.end);

      if (endMinutes <= startMinutes) {
        console.log('Invalid time range');

        process.exit(0);
      }

      currentRecord.minutes = endMinutes - startMinutes;
    }
  } else {
    timecards[CURRENT_DATE].push({
      start: time,
      end: null,
      week: CURRENT_WEEK,
      month: CURRENT_MONTH,
      year: CURRENT_YEAR
    });
  }
  
  await saveData();
};

export const updateEndTime = async time => {
  const currentRecord = timecards[CURRENT_DATE]
    .find(r => r.start === null || r.end === null);

    if (currentRecord) {
      currentRecord.end = time;
  
      const isRecordComplete = currentRecord.start && currentRecord.end;
  
      if (isRecordComplete) {
        const startMinutes = timeStringToMinutes(currentRecord.start);
        const endMinutes = timeStringToMinutes(currentRecord.end);

        if (endMinutes <= startMinutes) {
          console.log('Invalid time range');

          process.exit(0);
        }

        currentRecord.minutes = endMinutes - startMinutes;
      }
    } else {
      timecards[CURRENT_DATE].push({
        start: null,
        end: time,
        week: CURRENT_WEEK,
        month: CURRENT_MONTH,
        year: CURRENT_YEAR
      });
    }
    
    await saveData();
};

export const createTimecardFromTimeRange = async range => {
  const [
    startTime,
    endTime
  ] = range.split('-');

  const startMinutes = timeStringToMinutes(startTime);
  const endMinutes = timeStringToMinutes(endTime);
  
  timecards[CURRENT_DATE].push({
    start: startTime,
    end: endTime,
    week: CURRENT_WEEK,
    month: CURRENT_MONTH,
    year: CURRENT_YEAR,
    minutes: endMinutes - startMinutes
  });

  await saveData();
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

export const showTimecard = (date = CURRENT_DATE) => {
  const records = timecards[date];
  
  console.log(chalk.magenta(`${date}:`));

  if (!records) {
    console.log('No records');

    return;
  }
  
  records.forEach(showTimecardRecord);

  const completedRecords = records.filter(r => r.start && r.end);
  const totalMinutes = completedRecords.reduce((m, r) => m += r.minutes, 0);

  if (totalMinutes > 0) {
    console.log(chalk.yellow(`Total: ${minutesToDuration(totalMinutes)}`));
  }
};

export const showCurrentWeekTimecards = () => {
  let totalMinutes = 0;

  for (let [date, records] of Object.entries(timecards)) {
    const firstRecord = records[0];
    const isCurrentWeek = firstRecord.week === CURRENT_WEEK;
    const isCurrentYear = firstRecord.year === CURRENT_YEAR;

    if (isCurrentWeek && isCurrentYear) {
      showTimecard(date);
      console.log();

      totalMinutes += records.reduce((m, r) => m += r.minutes, 0);
    }
  }

  console.log(chalk.yellow(`Week total: ${minutesToDuration(totalMinutes)}`));
};

export const showCurrentMonthTimecards = () => {
  let totalMinutes = 0;

  for (let [date, records] of Object.entries(timecards)) {
    const firstRecord = records[0];
    const isCurrentMonth = firstRecord.month === CURRENT_MONTH;
    const isCurrentYear = firstRecord.year === CURRENT_YEAR;

    if (isCurrentMonth && isCurrentYear) {
      showTimecard(date);
      console.log();

      totalMinutes += records.reduce((m, r) => m += r.minutes, 0);
    }
  }

  console.log(chalk.yellow(`Month total: ${minutesToDuration(totalMinutes)}`));
};
