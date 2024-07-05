import { AppDataSource, AppointmentModel, UserModel } from "../config/data-source";
import { Appointment, Status } from "../entities/Appointment";
import ICreateAppointmentDto from "../dtos/IAppointmentDtos";
import AppointmentRepository from "../repositories/AppointmentRepository";
import UserRepository from "../repositories/UserRepository";
import { CustomError } from "../utils/CustomError";


export const getAppointmentsService = async():Promise<Appointment[]>=>{
    const appointments = await AppointmentRepository.findAll();
    return appointments;
}

export const getAppointmentByIDService =async(id:number):Promise<Appointment|null>=>{

    const appointment = await AppointmentRepository.findOneByID(id)
    return appointment;
}

export const createNewAppointmentService = async (appointmentData:ICreateAppointmentDto):Promise<void> =>{
    
    const queryRunner =  AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try{
        queryRunner.startTransaction();
        const newAppointment = AppointmentRepository.create(appointmentData);
        await queryRunner.manager.save(newAppointment);

        const user = await UserRepository.findById(appointmentData.userId)
        newAppointment.user = user;

        await queryRunner.manager.save(newAppointment);
        await queryRunner.commitTransaction();
        return

    }catch(err){
        await queryRunner.rollbackTransaction();
        throw new CustomError("usuario inexistente",400);

    }finally{
        await queryRunner.release();
    }
}

export const cancelAppointmentService = async (id:number):Promise<Appointment> =>{

    try{
        const appointmentFound = await AppointmentRepository.findOneByID(id)
        appointmentFound.status = Status.CANCELLED;
        AppointmentRepository.save(appointmentFound);
        return appointmentFound;
    }
    catch(err){
        throw new CustomError("No se econtro ID",404)
    }
}