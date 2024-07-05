import { useEffect, useState } from "react";
import CardAppointment from "../components/CardAppointment/CardAppointment";
import axios from 'axios'
import styles from './MisTurnos.module.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserAppointment } from "../redux/reducer";

const MisTurnos = () => {
    const appointments = useSelector((state)=> state.userAppointments)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state)=>state.userActive)

    useEffect(()=>{
        !user.name && navigate("/login")
    },[])

    const getAppointmentsInformation= async()=>{
        try{ const res = await axios.get(`http://localhost:3000/users/${user.id?user.id:"0"}`)
             dispatch(setUserAppointment(res.data.appointments))
        }
        catch(error){
            console.log(error)
        }
}
        


    useEffect(()=>{
        user.name && getAppointmentsInformation();
    },[]);

    return (

        <>
        { !user.name ? (
            <div>Loading</div>
        ) : (
            <div className={styles.container_general}>
                <h1>Mis Turnos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Estado</th>
                            <th>N° Mesa</th>
                            <th>Cancelacion</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        appointments.length === 0 ? (<tr><td>No tiene ninguna reserva</td></tr>) : 
                        (  <>
                            {appointments?.map((appointment)=>{
                                return(
                                    <CardAppointment turno={appointment} key={appointment.id}/>
                                )
                            })}
                            </>
                        )
                    }
                    </tbody>
                    
                </table>
            </div>
        )
        }
        </>
    )
}

export default MisTurnos; 