export const showCheckedInMessage = ({ processedArgs }) => {
  const [ time ] = processedArgs;

  console.log(`Checked in at ${time}`);
};

export const showCheckedOutMessage = ({ processedArgs }) => {
  const [ time ] = processedArgs;

  console.log(`Checked out at ${time}`);
};

export const showNewRecordMessage = ({ processedArgs }) => {
  const [ start, end ] = processedArgs;

  console.log(`Checked in at ${start} and out at ${end}`);
};
