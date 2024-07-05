import { Request, Response } from "express"
import { cancelAppointmentService, createNewAppointmentService, getAppointmentByIDService, getAppointmentsService } from "../services/appointmentsServices"
import { Appointment } from "../entities/Appointment";
import ICreateAppointmentDto from "../dtos/IAppointmentDtos";
import { CustomError } from "../utils/CustomError";

export const getAppointments = async (req:Request,res:Response) =>{
    try{
    const allAppointments = await getAppointmentsService();
    res.status(200).json(allAppointments)
    }
    catch(err){
        res.status(400).json({message:"Los turnos no fueron encontrados"})
    }
    
}

export const getAppointmentByID = async (req:Request,res:Response) =>{
    try{
        const id = Number(req.params.id);
        const Appointmentfound = await getAppointmentByIDService(id);
        res.status(200).json(Appointmentfound)
    }catch(err:any){
        if(err instanceof CustomError) res.status(err.statusCode).json({message:err.message})
        else res.status(500).json({message:err.message})
    }
}

export const createNewAppointment = async (req:Request,res:Response) =>{

    try{
        const {date,time,nMesa,status,userId} = req.body;
        await createNewAppointmentService({date,time,nMesa,status,userId})
        res.status(201).json({message:"se creo appointment"})
    }catch(err:any){
        if(err instanceof CustomError) res.status(err.statusCode).json({message:err.message})
        else res.status(500).json({message:err.message})
    }
}

export const cancelAppointment = async (req:Request,res:Response) =>{
    try{
        const id =req.params.id;
        const updateAppointment:Appointment = await cancelAppointmentService(Number(id)) 
        res.status(201).json({message:`Se actualizo el new appointment`,updateAppointment})
    }catch(err:any){
        if(err instanceof CustomError) res.status(err.statusCode).json({message:err.message})
        else res.status(500).json({message:err.message})
    }
}