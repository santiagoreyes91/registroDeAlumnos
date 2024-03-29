const BBDD = [
    {
        usuario: "santi",
        contraseña: "123",
    },
    {
        usuario: "matias",
        contraseña: "coder",
    },
]


const usuarioALoguear = {
    usuario: "",
    contraseña: "",
}

// Para mostrar el usuario registrado
const userLogin = JSON.parse(localStorage.getItem("userAuth"));
const userLogueado = document.querySelector("#user-logueado");
if(userLogin){
     userLogueado.innerHTML = `  ${userLogin.usuario}`
}

const inputUsuario = document.querySelector("#user-input");
const inputContraseña = document.querySelector("#password-input");
const iniciarSesion = document.querySelector("#login-button");
const errorLogin = document.getElementById("error");

inputUsuario.addEventListener("input", (event) => {
    errorLogin.innerHTML = "";
    usuarioALoguear.usuario = event.target.value
});

inputContraseña.addEventListener("input", (event) => {
    errorLogin.innerHTML = "";
    usuarioALoguear.contraseña = event.target.value
});


iniciarSesion.addEventListener("click", () => {
    const ifExists = BBDD.find((currentUsuario) => {
        return (
            currentUsuario.usuario === usuarioALoguear.usuario && 
            currentUsuario.contraseña === usuarioALoguear.contraseña
        );
    });

    if(ifExists){
        window.location.href = "registro.html";

        localStorage.setItem("userAuth", JSON.stringify(ifExists));

        console.log("Login exitoso");
    }else{
        const span = document.createElement("span");
        span.innerText = "Datos incorrectos";
        errorLogin.appendChild(span);

        console.log("Datos incorrectos");
    }
});




