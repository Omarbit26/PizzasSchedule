import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import { CustomError } from "../utils/CustomError";

const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
    findAll: async function(){
        const appointments = await this.find({
            relations:{
                user:true
            }
        })
        return appointments
    },
    findOneByID: async function (id:number){
        const appointment = await this.findOne({
            where:{
                id
            },
            relations:{
                user:true
            }
        })

        if(appointment) return appointment;
        else throw new CustomError("no se encontro id",404);
    }
});


export default AppointmentRepository;