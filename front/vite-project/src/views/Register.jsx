import { useEffect, useState } from "react";
import styles from "./Register.module.css"
import { validateRegister } from "../helpers/validateForms";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { dateStringtoDatedate } from "../utils/dateConversion";

const Register = () => {
    const navigate = useNavigate();
    const initialState = {
        name: "",
        email: "",
        birthdate: "",
        nDNI:"",
        username:"",
        password:"",
        repeatpassword:""
    };

    const typingInitalState = {
        name: false,
        email: false,
        birthdate: false,
        nDNI:false,
        username:false,
        password:false,
        repeatpassword:false,
    }

    const [userData, setUserData] = useState(initialState);
    const [errors,setErrors] = useState(initialState);
    const [typing, setTyping] = useState(typingInitalState);
    const [filling,setFilling] = useState(false);

    const postData = async () => {
        try {
            
            const userPost = {
                name:userData.name,
                email:userData.email,
                birthdate: dateStringtoDatedate(userData.birthdate),
                nDni:userData.nDNI,
                username: userData.username,
                password: userData.password
            }
            const response = await axios.post('http://localhost:3000/users/register', userPost);
            console.log(response)
            alert("Usuario registrado con exito")
        } catch (error) {
            console.log(error, "Fallo al realizar la petición")
            alert("No se ha podido registrar")
        }
    }

    const handleOnSubmit = (event)=>{
        event.preventDefault()
        postData();
        setUserData(initialState);
        setTyping(typingInitalState);
        setFilling(false);
        navigate("/")

    }

    const handleChange = (event)=>{
        const{name,value} = event.target;
        setUserData({
            ...userData,
            [name]:value
        });
        setTyping({
            ...typing,
            [name]:true
        });
        setFilling(true);
    }

    useEffect(()=>{
        setErrors(validateRegister(userData))
    },[userData])

    return(
    
        <div className={styles.formContainer}>
            <h2>Registro de usuarios: </h2>
            <form onSubmit={handleOnSubmit}>
                {[
                    {label: "Nombre", name: "name", type:"text"},
                    {label: "Correo", name: "email", type:"text"},
                    {label: "Usuario", name: "username", type:"text"},
                    {label: "Contraseña", name: "password", type:"password"},
                    {label: "Repetir Contraseña", name: "repeatpassword", type:"password"},
                    {label: "N° DNI", name: "nDNI", type:"text"},
                    {label: "Fecha de nacimiento", name: "birthdate", type:"date"}
                ].map(({name, label, type}) => {
                    return(
                        <div className={styles.pairContainer} key={name}>
                            <label>{label}</label>
                            <input className={styles.input} type={type} onChange={handleChange} name={name} value={userData[name]}></input>
                            {(errors[name]&&typing[name])&& <span key={name}>{errors[name]}</span>}
                        </div>
                    )   
                })}
                <button disabled={errors.name || errors.username || errors.password || errors.nDNI || errors.email || !filling} type="submit">
                    Registrar
                </button>
            </form>
        </div>

    )
}


export default Register;