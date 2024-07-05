import { Request, Response } from "express"
import { registerNewUserService, getUsersByIdService, getUsersService, loginUserService } from "../services/usersServices"
import { ILoginUserDto, IRegisterUserDto } from "../dtos/IUserDtos";
import { CustomError } from "../utils/CustomError";


export const getUsers =async(req:Request,res:Response) => {
    const allUsers = await getUsersService();
    res.status(201).json(allUsers);
}

export const getUserById =async(req:Request,res:Response)  =>{
    try{
    const id = Number(req.params.id)
    const user=await getUsersByIdService(id)
    res.status(200).json(user)
    }catch(err:any){
        if(err instanceof CustomError) res.status(err.statusCode).json({message:err.message});
        else res.status(500).json({message:err});
    }
    
}

export const registerNewUser =async(req:Request,res:Response) =>{
    try{
    const {name,email,birthdate,nDni,username,password} = req.body;
    const dataUser:IRegisterUserDto ={name,email,birthdate,nDni,username,password};
    const newRegister = await registerNewUserService(dataUser);
    res.status(201).json({message:"El usuario fue creado",usuario:newRegister})
    }catch(err:any){
        res.status(500).json({message:err});
    }
    
}

export const loginUser =async(req:Request,res:Response)=>{
    try{
    const{username,password} = req.body;
    const user_log = await loginUserService({username,password});
    res.status(200).json({login:true,user:user_log})
    }catch(err:any){
        if(err instanceof CustomError) res.status(err.statusCode).json({message:err.message});
        else res.status(500).json({message:err});
    }
    

}