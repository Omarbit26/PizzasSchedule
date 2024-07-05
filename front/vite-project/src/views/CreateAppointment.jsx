import styles from "./CreateAppointment.module.css"
import { useEffect, useState } from "react";
import { validateAppointment } from "../helpers/validateForms";
import { useDispatch, useSelector } from "react-redux";
import { createAppointmentAction } from "../redux/reducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dateStringtoDatedate } from "../utils/dateConversion";

const CreateAppointment= () => {

    const user = useSelector((state)=>state.userActive);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialState = {
        fecha: "",
        hora: "",
        nMesa: ""
    };
    const typingInitalState = {
        fecha: false,
        hora: false,
        nMesa: false
    }

    const [appointmentData, setAppointmentData] = useState(initialState);
    const [errors,setErrors] = useState(initialState);
    const [typing, setTyping] = useState(typingInitalState);
    const [filling,setFilling] = useState(false);

    useEffect(()=>{
        !user.name && navigate("/login")
    },[])


    const createAppointmentAppi= async()=>{
        const dataNewAppointment={
            date:dateStringtoDatedate(appointmentData.fecha),
            time:appointmentData.hora,
            nMesa:appointmentData.nMesa,
            status:"active",
            userId:user.id
        }
        const res = await axios.post("http://localhost:3000/appointments/schedule",dataNewAppointment)
    }

    const handleOnSubmit = (event)=>{
        event.preventDefault()
        createAppointmentAppi();
        setAppointmentData(initialState);
        setTyping(typingInitalState);
        setFilling(false);
        setTyping(false);
        alert("Reserva creada con exito")
        navigate("/appointments")
    }

    const handleChange = (event)=>{
        const{name,value} = event.target;
        setAppointmentData({
            ...appointmentData,
            [name]:value
        });
        setTyping({
            ...typing,
            [name]:true
        });
        setFilling(true);
    }

    useEffect(()=>{
        setErrors(validateAppointment(appointmentData))
    },[appointmentData])


    return(
        <>
            {!user.name? (
                <div>Loading</div>
            ):(
                <div className={styles.formContainer}>
                    <h2>Reservar mesa: </h2>
                    <form onSubmit={handleOnSubmit}>
                    {[
                        {label: "Fecha de la cita", name: "fecha", type:"date"},
                        {label: "Hora", name: "hora", type:"time"},
                        {label: "Numero de mesa", name: "nMesa", type:"text"},
                    ].map(({name, label, type}) => {
                        return(
                            <div className={styles.pairContainer} key={name}>
                                <label>{label}</label>
                                <input className={styles.input} type={type} onChange={handleChange} name={name} value={appointmentData[name]}></input>
                                {(errors[name]&&typing[name]) && <span key={name}>{errors[name]}</span>}
                            </div>
                        )   
                    })}
                    <button disabled={errors.fecha || errors.hora  || errors.nMesa || !filling} type="submit"
                    onClick={handleOnSubmit}
                    >
                        Crear
                    </button>
                    </form>
                </div>
            )}
        </>
        

        

    )
}


export default CreateAppointment