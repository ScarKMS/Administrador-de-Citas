class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita(citaActualizada) {
        /**
         * Retorna una copia del arreglo
         * buscar por el match de id
         * Si es correcto remplaza el objeto
         * Si no lo es asigna el mismo valor que tiene el campo iterado
         */
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}

export default Citas;