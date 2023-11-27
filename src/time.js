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

export const minutesToDuration = minutes => {
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  return (
    `${hours ? `${hours}h` : ""}` +
    `${hours && minutes ? " " : ""}` +
    `${minutes ? `${minutes}m` : ""}`
  );
};

export const timeStringToMinutes = timeString => {
  let [ hours, minutes ] = timeString
    .split(':')
    .map(v => +v);

  return minutes += hours * 60;
};

export const timeRangeToMinutes = (start, end) => {
  let [ startHours, startMinutes ] = start
    .split(':')
    .map(v => +v);
  startMinutes += startHours * 60;

  let [ endHours, endMinutes ] = end
    .split(':')
    .map(v => +v);
  endMinutes += endHours * 60;

  return Math.abs(endMinutes - startMinutes);
};

export const timeRangesComparator = (left, right) => {
  if (left.start && left.end && right.start && right.end) {
    const leftStartMinutes = timeStringToMinutes(left.start);
    const leftEndMinutes = timeStringToMinutes(left.end);
    const rightStartMinutes = timeStringToMinutes(right.start);
    const rightEndMinutes = timeStringToMinutes(right.end);

    return leftStartMinutes > rightStartMinutes
      || leftEndMinutes > rightEndMinutes
        ? 1
        : leftStartMinutes === rightStartMinutes
          && leftEndMinutes === rightEndMinutes
            ? 0
            : -1;
  } else if (!left.end || !right.end) {
    const leftStartMinutes = timeStringToMinutes(left.start);
    const rightStartMinutes = timeStringToMinutes(right.start);

    return leftStartMinutes > rightStartMinutes
      ? 1
      : leftStartMinutes === rightStartMinutes
        ? 0
        : -1;
  } else if (!left.start || !right.start) {
    const leftEndMinutes = timeStringToMinutes(left.end);
    const rightEndMinutes = timeStringToMinutes(right.end);

    return leftEndMinutes > rightEndMinutes
      ? 1
      : leftEndMinutes === rightEndMinutes
        ? 0
        : -1;
  }
};
