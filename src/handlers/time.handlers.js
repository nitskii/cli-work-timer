import { isValidTime } from "../lib/time.js";

export const validateInputTime = ({ processedArgs }) => {
  const [ time ] = processedArgs;

  if (isValidTime(time)) return;

  console.log('Invalid input time');
  process.exit(0);
};

export const validateInputTimeRande = ({ processedArgs }) => {
  const [ start, end ] = processedArgs;

  if (isValidTime(start) && isValidTime(end)) return;

  console.log('Invalid input time');
  process.exit(0);
};
