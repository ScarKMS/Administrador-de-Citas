import Citas from './clases/Citas.js';
import UI from './clases/UI.js';

import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();

let editando;

//Objeto con la informacion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sitomas: ''
}

//Agrega datos al objeto de cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

    console.log(citaObj);
}

//Valida y agrega una nueva Cita a la clase de Citas

export function nuevaCita(e) {

    e.preventDefault();

    //Extraer la informacion del OBj de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //Validar
    if (mascota === '' | propietario === '' | telefono === '' | fecha === '' | hora === '' | sintomas === '') {
        ui.imprimirAlerta('Todos los Campos son obligatorios', true);
        return;
    }

    if (editando) {
        ui.imprimirAlerta('Se actualizo correctamente', false)

        // Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj });

        //Regresar texto de boton
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //Quitar modo edicion
        editando = false;
    } else {
        //generar un ID unico
        citaObj.id = Date.now();

        //Creando una nueva Cita
        administrarCitas.agregarCita({...citaObj });

        // Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego correctamente', false)
    }

    // Reiniciar el objeto para la validacion
    reiniciarObjeto();

    //Resetear formulario
    formulario.reset();

    //Mostrar el HTML
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sitomas = '';
}

export function eliminarCita(id) {
    // Eliminar Cita
    administrarCitas.eliminarCita(id);

    // Mostrar mensaje
    ui.imprimirAlerta('La cita se elimino correctamente', false);

    // Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fecha.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}