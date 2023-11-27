import moment from 'moment';

export const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  return `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;
};

export const isValidTime = time => moment(time, 'H:mm', true).isValid();

const TODAY = moment();
export const CURRENT_DATE = TODAY.format('DD.MM.YYYY');
export const CURRENT_WEEK = TODAY.week();
export const CURRENT_MONTH = TODAY.format('MMMM');
export const CURRENT_YEAR = TODAY.year();

export const minutesToDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  return (
    `${hours ? `${hours}h` : ""}` +
    `${hours && minutes ? " " : ""}` +
    `${minutes ? `${minutes}m` : ""}`
  );
};

export const timeRangeToMinutes = (start, end) => {
  let [ startHours, startMinutes ]= start.split(':').map(v => +v);
  startMinutes += startHours * 60;

  let [ endHours, endMinutes ]= end.split(':').map(v => +v);
  endMinutes += endHours * 60;

  return Math.abs(endMinutes - startMinutes);
};
