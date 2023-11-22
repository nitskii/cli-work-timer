import { existsSync, readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

const DATA_FILE_NAME = 'timecards.json';

export const saveData = async () => {
  await writeFile(DATA_FILE_NAME, `${JSON.stringify(data, null, 2)}\n`);
};

export const data = existsSync(DATA_FILE_NAME)
  ? JSON.parse(readFileSync(DATA_FILE_NAME))
  : {};