require('colors')

const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const guardarDB = require('./helpers/guardarArchivo')
const Tareas = require('./models/tareas');
// const Tarea = require('./models/tarea');


const main = async() => {
  // console.log('Hola Mundo');

  let opt = ''
  const tareas = new Tareas()

  do {
    opt = await inquirerMenu();
    console.log(opt);
    console.log('\n')

    switch (opt) {
      case "1":
        const desc = await leerInput('Descripcion:')
        tareas.crearTareas(desc)
        break;
      case "2":
        console.log(tareas.listadoArray)
        break;
      case "3":
        break;
      case "4":
        break;
      case "5":
        break;
      case "6":
        break;
      case "0":
        break;
      default:
        break;
    }
    
    // guardarDB(tareas.listadoArray)

    await pausa()

  } while (opt !== '0');

}

main()
