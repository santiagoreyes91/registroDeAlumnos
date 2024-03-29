const alumnosArray = []

//const ingresoAlumnos = document.querySelector("#form-alumnos");
const btnAgregarAlumno = document.querySelector("#agregar-alumno");
const btnDeshacer = document.querySelector("#undo");

btnAgregarAlumno.addEventListener("click", agregarAlumno);

function agregarAlumno(e){

    e.preventDefault();
    let nombre = document.querySelector("#nombre-alumno").value;
    let nota = parseInt(document.querySelector("#nota").value);
    let materia = document.querySelector("#materia").value;

    let nuevoAlumno = {
        nombre: nombre,
        nota: nota,
        materia: materia
    };


    if(nombre!="" && nota!="" && !isNaN(nota) && materia!=""){
        alumnosArray.push(nuevoAlumno);
        console.log(alumnosArray);

        let jsonNuevoAlumno = JSON.stringify(nuevoAlumno);
        let alumnoIngresado = document.createElement("li");
        alumnoIngresado.innerText = jsonNuevoAlumno;


        // Crear boton eliminar para cada alumno agregado a la lista
        let botonElimnar = document.createElement("button");

        botonElimnar.innerText = "Eliminar";
        botonElimnar.id= "boton-eliminar"
        botonElimnar.addEventListener("click", () => {
            let index = alumnosArray.indexOf(nuevoAlumno);

            if (index > -1) {
                alumnosArray.splice(index, 1);
            }
            alumnoIngresado.remove();

            const aviso = document.getElementById("aviso");
            if (alumnosArray.length === 0) {
                aviso.textContent = "[vacío]";
            }
        });
        alumnoIngresado.appendChild(botonElimnar);
        // -- -- --

        let listadoAlumnos = document.querySelector("#listado-alumnos");
        listadoAlumnos.append(alumnoIngresado);

        document.getElementById('nombre-alumno').value = '';
        document.getElementById('nota').value = '';
        document.getElementById('materia').value = '';
    } else {
        Swal.fire({
            position: 'top',
            title: 'Error',
            text: 'Ingrese todos los datos correctamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
    }

    const aviso = document.getElementById("aviso");
    if (alumnosArray.length > 0) {
        aviso.textContent = "";
    }
}

btnDeshacer.addEventListener("click", () =>{
    //Lo saca del array pero no de la lista a mostrar
    alumnosArray.pop();
    let listadoAlumnos = document.querySelector("#listado-alumnos");
    //Para remover el ulitmo elemento de la lista a mostrar
    listadoAlumnos.removeChild(listadoAlumnos.lastElementChild);

    const aviso = document.getElementById("aviso");
    if (alumnosArray.length === 0) {
        aviso.textContent = "[vacío]";
    }
})





const btnCalcularPromedio = document.querySelector("#calcular-promedio");
btnCalcularPromedio.addEventListener("click", mostrarPromedio);

function calcularPromedio() {

    let acumulador = 0;

    for(let i = 0; i < alumnosArray.length; i++){
    acumulador = acumulador + alumnosArray[i].nota
    }

    if(acumulador > 0) {
        let promedio = (acumulador / alumnosArray.length);
        return promedio;
    } else {
        Swal.fire({
            title: 'Error',
            text: 'No hay suficientes alumnos para calcular el promedio de notas',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
    }
}

// mostrar resultado
function mostrarPromedio(){
    let resultado = calcularPromedio();
    console.log(resultado);
    document.getElementById("mostrar-promedio").innerText = resultado;
}

const logout = document.querySelector("#log-out");
//funcion logout
logout.addEventListener("click", () => {
    localStorage.removeItem("userAuth");
    window.location.href = "index.html"
});
