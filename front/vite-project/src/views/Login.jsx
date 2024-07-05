import { useEffect, useState } from "react";
import styles from "./Login.module.css"
import { validateLogin } from "../helpers/validateForms";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserActive } from "../redux/reducer";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialState = {
        username: "",
        password: ""
    };
    const typingInitalState = {
        username:false,
        password:false,
    }


    const [dataLogin, setDataLogin] = useState(initialState);
    const [errors,setErrors] = useState(initialState);
    const [typing, setTyping] = useState(typingInitalState);
    const [filling,setFilling] = useState(false);


    const postLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/users/login', dataLogin);
            alert("Usuario logueado con exito")
            dispatch(setUserActive(response.data.user))
            setDataLogin(initialState)
            setTyping(typingInitalState)
            setFilling(false)
            navigate("/")
        } catch (error) {
            console.log(error, "Fallo al realizar la petición")
            alert("No se ha podido Loguear")
        }
    }

    const handleOnSubmit = (event)=>{
        event.preventDefault();
        postLogin();
        
    }

    const handleChange = (event) => {
        const{name,value} = event.target;
        setDataLogin({
            ...dataLogin,
            [name]:value
        });
        setTyping({
            ...typing,
            [name]:true
        });
        setFilling(true);
        
    }

    useEffect(()=>{
        setErrors(validateLogin(dataLogin))
    },[dataLogin])

    return(
        <div className={styles.formContainer}>
            <h2>Login de Usuario</h2>
            <form onSubmit={handleOnSubmit}>
                {[
                    {label: "User Name", name: "username", type:"text"},
                    {label: "Password", name: "password", type:"password"},
                ].map(({name, label, type}) => {
                    return(
                        <div className={styles.pairContainer} key={name}>
                            <label>{label}</label>
                            <input className={styles.input} type={type} onChange={handleChange} name={name} value={dataLogin[name]}></input>
                            {(errors[name]&&typing[name] ) && <span key={name}>{errors[name]}</span>}
                        </div>
                    )   
                })}
                <button disabled={(errors.username ||  errors.password)||!filling} type="submit">
                    Login
                </button>
            </form>

            <div>
                <h3>No tienes una cuenta?</h3>
                <button onClick={()=>navigate("/register")}>
                    Register
                </button>
            </div>
        </div>
    )
}

export default Login;