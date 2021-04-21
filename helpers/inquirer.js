require('colors')
const inquirer = require('inquirer')

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué deseas hacer?',
    choices: [ 
      {
        value: '1',
        name: '1. Crear tarea'
      },
      {
        value: '2',
        name: '2. Listar tareas'
      },
      {
        value: '3',
        name: '3. Listar tareas completadas'
      },
      {
        value: '4',
        name: '4. Listar tareas pendientes'
      },
      {
        value: '5',
        name: '5. Completar tarea(s)'
      },
      {
        value: '6',
        name: '6. Borrar tarea'
      },
      {
        value: '0',
        name: '0. Salir'
      }
    ]
  }
]

const inquirerMenu = async() => {
  console.clear();
  console.log("===================================".green);
  console.log("      Seleccione una opción".green);
  console.log("===================================\n".green);

  //* con destructuring
  const {opcion} = await inquirer.prompt(preguntas)

  return opcion
}

const pausa = async() => {

  const question = [
    {
      type: "input",
      name: "pausa",
      message: `Presione ${"Enter".green} para continuar`
    }
  ];

  //* aca no guardamos el valor de inquirer ya que solo es para pausar la consola
  await inquirer.prompt(question)
}

const leerInput = async(message) => {

  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if(value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      }
    }
  ]

  //? inquirer prompt devuelve un objeto 
  //* sin destructuring
  const description = await inquirer.prompt(question);
  
  // console.log(description.desc)

  return description.desc
}


module.exports = {
  inquirerMenu,
  pausa,
  leerInput
}