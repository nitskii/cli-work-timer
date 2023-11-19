import moment from 'moment';

const isValidTime = time =>
  moment(time, 'H:mm', true).isValid() ||
  moment(time, 'h:mm A', true).isValid();

export const validateInputTime = ({ args }) => {
  const [time] = args;

  if (time && !isValidTime(time)) {
    console.log('Invalid input time');

    process.exit(0);
  }
};

export const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  return `${hours}:${minutes}`;
};
