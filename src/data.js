import {
  existsSync,
  mkdirSync,
  readFileSync
} from 'fs';
import { writeFile } from 'fs/promises';
import { homedir, platform } from 'os';

const APP_FOLDER = platform() == 'win32'
  ? `${process.env.LOCALAPPDATA}/work-timer`
  : `${homedir()}/.work-timer`;

existsSync(APP_FOLDER) || mkdirSync(APP_FOLDER);

const DATA_FILE_NAME = `${APP_FOLDER}/timecards.json`;

export const saveData = async () => {
  await writeFile(DATA_FILE_NAME, `${JSON.stringify(data, null, 2)}\n`);
};

export const data = existsSync(DATA_FILE_NAME)
  ? JSON.parse(readFileSync(DATA_FILE_NAME))
  : {};