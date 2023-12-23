import inquirer from 'inquirer';
import 'colors';

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear tarea`,
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tareas`,
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`,
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`,
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tareas`,
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea`,
      },
      {
        value: '0',
        name: `${'0.'.green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('==============='.yellow);
  console.log('        Seleccione una opcion: '.cyan);
  console.log('===============\n'.yellow);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const questions2 = [
  {
    name: 'enter',
    type: 'input',
    message: `Presione ${'Enter'.cyan} para continuar`,
  },
];

const pause = async () => {
  console.log('\n');
  await inquirer.prompt(questions2);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'por favor ingrese un valor';
        }
        return true;
      },
    },
  ];
  const { description } = await inquirer.prompt(question);
  return description;
};

const listTasksToDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}`.green;

    return {
      value: task.id,
      name: `${idx} ${task.description}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Calcelar',
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);

  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}`.green;

    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.createdAt !== null ? true : false,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);

  return ids;
};

export {
  inquirerMenu,
  pause,
  readInput,
  listTasksToDelete,
  confirm,
  showCheckList,
};
