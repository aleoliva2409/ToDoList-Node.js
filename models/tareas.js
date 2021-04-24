const { green, red } = require("colors");
const Tarea = require("./tarea");

class Tareas {
  // _listado = {}
  constructor() {
    this._listado = {};
  }

  crearTareas(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  get listadoArray() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    const tareas = [];

    for (let tarea in this._listado) {
      tareas.push(this._listado[tarea]);
    }

    let ntareas = 0;

    for (let i = 0; i < tareas.length; i++) {
      if (tareas[i].completadoEn !== null) {
        console.log(
          `${green(++ntareas + ".")} ${tareas[i].desc} :: ${"Completada".green}`
        );
      } else {
        console.log(
          `${red(++ntareas + ".")} ${tareas[i].desc} :: ${"Pendiente".red}`
        );
      }
    }

    console.log("\n");
  }

  listarPendientesCompletadas(completadas = true) {
    if (!completadas) {
      const tareas = this.listadoArray;
      let id = 1
      for (let i = 0; i < tareas.length; i++) {
        if (!tareas[i].completadoEn) {
          const desc = tareas[i].desc;

          console.log(`${id++}.`.red + `${desc} :: ${"Pendiente".red}`);
        }
      }
    } else {
      const tareas = this.listadoArray;
      let id = 1
      for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].completadoEn) {
          const desc = tareas[i].desc;

          console.log(`${id++}.`.green + `${desc} :: ${tareas[i].completadoEn.green}`);
        }
      }
    }
  }

  borrarTarea(id){
    if(this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []){
    ids.forEach(id => {
      const tarea = this._listado[id];
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toLocaleString()
      }
    })

    this.listadoArray.forEach(tarea => {
      if(!ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null;
      }
    })
  }
}

module.exports = Tareas;
