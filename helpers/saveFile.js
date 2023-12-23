import fs from 'node:fs/promises';

const file = './db/data.json';

const saveDB = async (data) => {
  try {
    await fs.writeFile(file, JSON.stringify(data), 'utf-8');
  } catch (error) {
    console.log(error);
  }
};

const readFileDB = async () => {
  try {
    const info = await fs.readFile(file, 'utf-8');

    return JSON.parse(info);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { readFileDB, saveDB };
