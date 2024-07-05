import { Router } from "express";
import { cancelAppointment, createNewAppointment, getAppointmentByID, getAppointments } from "../controllers/appointmentsController";
import { validateAppointment } from "../middlewares/validateAppointment";



const routerAppointments: Router = Router();

routerAppointments.get("/",getAppointments)
routerAppointments.get("/:id",getAppointmentByID)
routerAppointments.post("/schedule",createNewAppointment)
routerAppointments.put("/cancel/:id",cancelAppointment)



export default routerAppointments;