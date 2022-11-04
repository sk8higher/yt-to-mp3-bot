import fs from 'node:fs/promises';
import path from 'node:path';

const directory = '../mp3';

async function clearDirectory() {
  for (const file of await fs.readdir(directory)) {
    await fs.unlink(path.join(directory, file));
  }
}

export default clearDirectory;
