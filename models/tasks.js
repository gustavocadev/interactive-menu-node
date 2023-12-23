import Task from './task.js';
import 'colors';

class Tasks {
  _list = {};

  get listArray() {
    const list = [];
    Object.keys(this._list).forEach((id) => {
      const task = this._list[id];
      list.push(task);
    });
    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(description = '') {
    const task = new Task(description);

    this._list[task.id] = task;
  }

  completeList() {
    // 1. Alma :: Completada
    this.listArray.forEach((task, idx) => {
      console.log(
        `${`${idx + 1}`.green} ${task.description} :: ${
          task.createdAt !== null ? 'Completado'.green : 'Pediente'.red
        }`
      );
    });
  }

  listPendingCompleted(completed = true) {
    if (!completed) {
      const arrayOfPendingTasks = this.listArray.filter(
        (task) => task.createdAt === null
      );

      arrayOfPendingTasks.forEach((task, idx) => {
        console.log(
          `${`${idx + 1}`.green} ${task.description} :: ${'Pendiente'.red}`
        );
      });
      return;
    }
    const arrayOfCompletedTasks = this.listArray.filter(
      (task) => task.createdAt !== null
    );

    arrayOfCompletedTasks.forEach((task, idx) => {
      console.log(
        `${`${idx + 1}`.green} ${task.description} :: ${'Completado'.green}`
      );
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.createdAt) {
        task.createdAt = new Date().toISOString();
      }
    });

    this.listArray.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].createdAt = null;
      }
    });
  }
}

export default Tasks;
