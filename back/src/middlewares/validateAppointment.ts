import { NextFunction, Request, Response } from "express"

export const validateAppointment = (req:Request, res:Response, next:NextFunction) =>{


    next();
}

