export const showCheckedInMessage = ({ processedArgs }) => {
  const [ time ] = processedArgs;

  console.log(`Checked in at ${time}`);
};

export const showCheckedOutMessage = ({ processedArgs }) => {
  const [ time ] = processedArgs;

  console.log(`Checked out at ${time}`);
};