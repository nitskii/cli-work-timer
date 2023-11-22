import moment from 'moment';

export const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  return `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;
};

export const isValidTime = time => moment(time, 'H:mm', true).isValid();

export const today = new Date().toLocaleDateString('uk-UA');

export const getTimeRangeDuration = (start, end) => {
  const [ startHours, startMinutes ]= start.split(':');
  const startSeconds = startHours * 3600 + startMinutes * 60;

  const [ endHours, endMinutes ]= end.split(':');
  const endSeconds = endHours * 3600 + endMinutes * 60;

  const duration = Math.abs(endSeconds - startSeconds);
  const hours = Math.floor(duration / 3600);
  const minutes = duration % 3600 / 60;

  return `${hours ? `${hours}h ` : ""}${minutes}m`;
};
