import { Status } from "../entities/Appointment";

export interface IAppointment{
    id: number,
    date: Date,
    time:String,
    userId:number,
    status:Status
}

