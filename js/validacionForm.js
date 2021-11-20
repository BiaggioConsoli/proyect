const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false  
}


const validarFormulario = (e) => {
   switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
        break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
        break;
        case "password2":
            validarPassword2();
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
   }
}


const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} span`).classList.add('icon-checkmark');
        document.querySelector(`#grupo__${campo} span`).classList.remove('icon-cross');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} span`).classList.remove('icon-checkmark');
        document.querySelector(`#grupo__${campo} span`).classList.add('icon-cross');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos [campo] = false;
    }

}

const validarPassword2 = () => {
    const InputPassword1 = document.getElementById('password');
    const InputPassword2 = document.getElementById('password2');
    if (InputPassword1.value !== InputPassword2.value){
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 span`).classList.remove('icon-checkmark');
        document.querySelector(`#grupo__password2 span`).classList.add('icon-cross');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos ['password'] = false;
    }else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 span`).classList.add('icon-checkmark');
        document.querySelector(`#grupo__password2 span`).classList.remove('icon-cross');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos ['password'] = true;
        }
}


let user = document.getElementById('usuario').value;
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario );
    input.addEventListener('blur', validarFormulario );

    });



formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const terminos = document.getElementById('terminos');
    class datosUsuario {
        constructor (user, name, mail, phone) {
            this.user = user;
            this.name = name;
            this.mail = mail;
            this.phone = phone;
        }
    } 
    const datosUsuario1 = new datosUsuario (
        document.getElementById('usuario').value,
        document.getElementById('nombre').value,
        document.getElementById('correo').value,
        document.getElementById('telefono').value
    );

 
    if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
        formulario.reset();
        console.log(datosUsuario1);
        const datosUsuario1JSON = JSON.stringify(datosUsuario1);
        localStorage.setItem("datosUsuario1", datosUsuario1JSON);
        const usuario1 = JSON.parse(datosUsuario1JSON);
        console.log(usuario1.user)
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo'); 
        }, 6000);
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');

        })
        document.getElementById('boton__registro').classList.add('boton_registro-registrado');
        user_registro.innerHTML = `<h2> ${usuario1.user}</h2>`;
        document.getElementById('user_registro_icon').classList.add('user_registro_icon-registrado');
    }else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }

});
