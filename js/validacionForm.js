
$(document).ready(function(){
    $("#ctm").hide();
    $('#descuentos').hide();
    
    
    
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
            $(`#grupo__${campo}`).removeClass('formulario__grupo-incorrecto');
            $(`#grupo__${campo}`).addClass('formulario__grupo-correcto');
            $(`#grupo__${campo} span`).addClass('icon-checkmark');
            $(`#grupo__${campo} span`).removeClass('icon-cross');
            $(`#grupo__${campo} .formulario__input-error`).removeClass('formulario__input-error-activo');
            campos[campo] = true;
        } else {
            $(`#grupo__${campo}`).addClass('formulario__grupo-incorrecto');
            $(`#grupo__${campo}`).removeClass('formulario__grupo-correcto');
            $(`#grupo__${campo} span`).removeClass('icon-checkmark');
            $(`#grupo__${campo} span`).addClass('icon-cross');
            $(`#grupo__${campo} .formulario__input-error`).addClass('formulario__input-error-activo')
            campos [campo] = false;
        }

    }

    const validarPassword2 = () => {
        const InputPassword1 = $('#password');
        const InputPassword2 = $('#password2');
        if (InputPassword1.val() !== InputPassword2.val()) {
            $(`#grupo__password2`).addClass('formulario__grupo-incorrecto');
            $(`#grupo__password2`).removeClass('formulario__grupo-correcto');
            $(`#grupo__password2 span`).removeClass('icon-checkmark');
            $(`#grupo__password2 span`).addClass('icon-cross');
            $(`#grupo__password2 .formulario__input-error`).addClass('formulario__input-error-activo')
            campos ['password'] = false;
        }else {
            $(`#grupo__password2`).removeClass('formulario__grupo-incorrecto');
            $(`#grupo__password2`).addClass('formulario__grupo-correcto');
            $(`#grupo__password2 span`).addClass('icon-checkmark');
            $(`#grupo__password2 span`).removeClass('icon-cross');
            $(`#grupo__password2 .formulario__input-error`).removeClass('formulario__input-error-activo')
            campos ['password'] = true;
            }
    }


    let user = document.getElementById('usuario').value;
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario );
        input.addEventListener('blur', validarFormulario );
        });



    
    $('#formulario').submit(function(e) {
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
            $("#usuario").val(),
            $('#nombre').val(),
            $('#correo').val(),
            $('#telefono').val()
        );

    
        if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
            formulario.reset();
            console.log(datosUsuario1);
            const datosUsuario1JSON = JSON.stringify(datosUsuario1);
            localStorage.setItem("datosUsuario1", datosUsuario1JSON);
            const usuario1 = JSON.parse(datosUsuario1JSON);
            console.log(usuario1.user)
            $('.formulario__validacion-estado').hide();
            $('#boton__registro').addClass('boton_registro-registrado');
            $('#user_registro').append(`<h2> ${usuario1.user}</h2>`);
            $('#formulario__mensaje').removeClass('formulario__mensaje-activo');
            $("#ctm").slideDown(4000);
            $('#form').hide();
            $('#descuentos').prepend(`<h5> ${usuario1.name}, disfruta de los beneficios que tenemos para ti</h5>`);
            $('#descuentos').prepend(`<h4>El formulario fue enviado correctamente, gracias por registrarte</h4>`);
            $.getJSON('promociones.json',(respuesta, estado) => {
                if (estado === 'success') {
                }
                respuesta.forEach((descuento) => {
                    $('.descuentos').append(
                        `<li>${descuento.Disciplina}</li>
                        <p>${descuento.desc}</p>`);
                });
            });
            $('#descuentos').fadeIn(4000);   
        }else {
            $('#formulario__mensaje').addClass('formulario__mensaje-activo');
        }
    });
});

