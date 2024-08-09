import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import onError from './onError.js';

const _dirname = path.dirname(fileURLToPath(import.meta.url));
const filesDir = path.join(_dirname, '../files');

const getFilePath = (file) => path.join(filesDir, file);

const removeFile = async (file) => {
  try {
    await fs.unlink(getFilePath(file));
  } catch (error) {
    onError(error)
  }
}

export {
  getFilePath,
  removeFile
};
