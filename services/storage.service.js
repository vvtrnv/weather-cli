import { promises } from 'fs';
import { filename } from '../constants/constants.js'
import { join } from 'path';
import { homedir } from 'os';

const filePath = join(homedir(), filename);

export const saveConfig = async (key, value) => {
  let data = {};
  const isFileExists = await isExists(filePath);
  if (isFileExists) {
    const file = await promises.readFile(filePath, {
      encoding: 'utf-8',
    });
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
}

export const getConfig = async (key) => {
  const isFileExists = await isExists(filePath);
  if (isFileExists) {
    const file = await promises.readFile(filePath, {
      encoding: 'utf-8',
    });
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
}

const isExists = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
}
