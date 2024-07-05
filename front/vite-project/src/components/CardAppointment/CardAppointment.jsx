import styles from "./CardAppointment.module.css"
import { dateToString, diffDays } from "../../utils/dateConversion";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cancelAppointmentAction } from "../../redux/reducer";

const CardAppointment = ({turno:{id,date,nMesa,time,status}}) => {

    const [ statusAppointment, setStatusAppointment] = useState(status)
    const [colorStatus, setColorStatus] = useState(status==="active"?"green":"red")
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.userActive);

    
    const cancelAppointment = async()=>{
        try{ 
            
            const confirmDelete = window.confirm('¿Estás seguro de que cancelar esta reserva?');
            if(confirmDelete){
                const dateObject = new Date(date)
                const days = diffDays(dateObject);
                if(days<1){
                    alert("Las reversar se pueden cancelar hasta un dia previo")
                }else{
                    const res = await axios.put(`http://localhost:3000/appointments/cancel/${id}`)
                    dispatch(cancelAppointmentAction(id))
                    setStatusAppointment("cancelled")
                    setColorStatus("red")
                }
                
            }

            
        }
        catch(error){
             console.log(error)
        }
    }

    const handleCancel = () => {
        user.name && cancelAppointment();
    }

    return(
        <tr key={id}>
            <td>{dateToString(date)}</td>
            <td>{time}</td>
            <td>
                <div className={styles.status} style={{ backgroundColor: colorStatus}} >{status}</div>
            </td>
            <td>{nMesa}</td>
            <td className={styles.container_button}>
                <button onClick={handleCancel} className={styles.button_cancell} disabled={statusAppointment==="cancelled"}>
                    Cancelar
                </button>
            </td>
        </tr>
    )
}

export default CardAppointment;