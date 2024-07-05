import { Status } from "../entities/Appointment"

interface ICreateAppointmentDto{
    date: Date,
    time:String,
    nMesa:String,
    status:Status,
    userId:number
}

export default ICreateAppointmentDto