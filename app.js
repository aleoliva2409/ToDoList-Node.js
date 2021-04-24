require('colors')

const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require("./helpers/inquirer");
const {guardarDB,leerDB} = require('./helpers/guardarArchivo')
const Tareas = require('./models/tareas');
// const Tarea = require('./models/tarea');


const main = async() => {
  // console.log('Hola Mundo');

  let opt = ''
  const tareas = new Tareas()
  const tareasDB = leerDB()

  if(tareasDB){
    tareas.cargarTareasFromArray(tareasDB)
  }

  do {
    opt = await inquirerMenu();
    // console.log(opt);
    console.log('\n')

    switch (opt) {
      case "1":
        const desc = await leerInput('Descripcion:')
        tareas.crearTareas(desc)
        break;
      case "2":
        tareas.listadoCompleto()
        break;
      case "3":
        tareas.listarPendientesCompletadas()
        break;
      case "4":
        tareas.listarPendientesCompletadas(false)
        break;
      case "5":
        const ids = await mostrarListadoCheckList(tareas.listadoArray)
        tareas.toggleCompletadas(ids)
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArray)
        if(id !== '0'){
          const ok = await confirmar("¿Estas seguro?");
          // TODO: preguntar si estas seguro
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
      case "0":
        break;
      default:
        break;
    }
    
    guardarDB(tareas.listadoArray)

    await pausa()

  } while (opt !== '0');

}

main()
