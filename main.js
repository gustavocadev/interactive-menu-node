import {
  inquirerMenu,
  pause,
  readInput,
  listTasksToDelete,
  confirm,
  showCheckList,
} from './helpers/inquirer.js';
import { saveDB, readFileDB } from './helpers/saveFile.js';
import Tasks from './models/tasks.js';

const main = async () => {
  let option = '';

  const tasks = new Tasks();

  const tareasDB = await readFileDB();
  // console.log(tareasDB);

  if (tareasDB) {
    // set tasks
    tasks.loadTasksFromArray(tareasDB);
  }

  // await pause();

  do {
    option = await inquirerMenu();
    // console.log({ option });

    if (option === '1') {
      const description = await readInput('Descripción: ');
      tasks.createTask(description);
    }
    if (option === '2') {
      tasks.completeList();
      // console.log(tasks.listArray);
    }
    if (option === '3') {
      tasks.listPendingCompleted(true);
    }
    if (option === '4') {
      tasks.listPendingCompleted(false);
    }
    if (option === '5') {
      const ids = await showCheckList(tasks.listArray);
      tasks.toggleCompleted(ids);
      console.log(ids);
    }
    if (option === '6') {
      const id = await listTasksToDelete(tasks.listArray);
      if (id !== '0') {
        const ok = await confirm('Estás seguro?');
        if (ok) {
          tasks.deleteTask(id);
          console.log('Tarea borrada');
        }
      }
    }

    await saveDB(tasks.listArray);

    await pause();
  } while (option !== '0');
};

main();
