import moment from 'moment';

export const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  return `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;
};

export const isValidTime = time => moment(time, 'H:mm', true).isValid();

const today = moment();
export const currentDate = today.format('DD.MM.YYYY');
export const currentWeek = today.week();
export const currentMonth = today.format('MMMM');
export const currentYear = today.year();

export const minutesToDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  return (
    `${hours ? `${hours}h ` : ""}` +
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
