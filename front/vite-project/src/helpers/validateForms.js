import { dateStringtoDatedate, diffDays } from "../utils/dateConversion";

const advertenciaRegister = {
    name:"El nombre solo debe contener letras. Ejm: Omar Aliaga",
    email:"Ingrese un email valido. Ejm:example@gmail.com ",
    birthdate:"El usuario debe ser mayor de 15 años",
    nDNI: "Ingrese un numero de 8 digitos. Ejm:01491340",
    username: "El username debecontener al menos 4 caracteres alfanumericos. Ejm:Omar123",
    password:"El password debe tener 8 caracteres como mínimo y al menos un caracter numérico",
    repeatpassword:"Las contraseñas no coinciden"
}

export const validateRegister = (userData)=>{
    const regexs = {
    name :  /^[a-zA-ZáéíóúÁÉÍÓÚ\s']+$/,
    email :  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    birthdate :  /^\d{4}-\d{2}-\d{2}$/,
    nDNI : /^\d{8}$/,
    username : /^[a-zA-Z0-9._-]{4,}$/,
    password : /^(?=.*\d).{8,}$/,
    repeatpassword : /.+/
    }   
    
    const errors = {};

    for( let clave in regexs){
        if(regexs[clave].test(userData[clave])){
            if(clave === "birthdate"){
                const yearToday = new Date().getFullYear();
                const edad = yearToday-dateStringtoDatedate(userData.birthdate).getFullYear();
                edad>=15? errors[clave] = "" : errors[clave]=advertenciaRegister[clave];
            }
            else if(clave === "repeatpassword"){userData.repeatpassword === userData.password? errors[clave] = "":errors[clave]=advertenciaRegister[clave];}
            else{errors[clave]="";}
        }else{
            errors[clave]=advertenciaRegister[clave]
        }
    }
    return errors
}

const advertenciaLogin = {
    username:"Ingrese un usuario valido. Ejem:name123",
    password:"",
}

export const  validateLogin = (dataLogin) => {
    const regexs = {
        username :  /^[a-zA-Z0-9._-]{4,}$/,
        password : /.+/
    }

    const errors = {}

    for( let clave in regexs){
        regexs[clave].test(dataLogin[clave])? errors[clave]="" : errors[clave]= advertenciaLogin[clave]
    }

    return errors
}

const advertenciaAppointment = {
    fecha: "Solo se puede programar fechas con un dia de anticipación y no mas de un mes",
    hora: "Solo se pueden programar entre la 9:00 AM y 08:59 PM.",
    nMesa: "Seleccione una mesa valida: Ejem:1B (piso 1 mesa B)"
}

export const validateAppointment = (dataAppointment) => {
    const regexs = {
        fecha: /^\d{4}-\d{2}-\d{2}$/,
        hora:  /^(0[9]|1\d|20):[0-5]\d$/,
        nMesa: /^\d[A-Z]$/
    }

    const errors = {}

    for( let clave in regexs){

        if(regexs[clave].test(dataAppointment[clave])){

            if(clave==="fecha"){
                const dateObject = dateStringtoDatedate(dataAppointment[clave]);
                const days = diffDays(dateObject)
                const day = dateObject.getDay()*1;
                if(days>=1&&days<=31){
                    if(!(day==0)){
                        errors[clave]=""
                    }else{
                        errors[clave]="No hay atencion los dias domingos"
                    }
                    
                }else{
                    errors[clave]= advertenciaAppointment[clave];
                }
            }

        }else{
            errors[clave]= advertenciaAppointment[clave];
        }

        
    }

    return errors

}