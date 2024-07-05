import { AppDataSource, UserModel } from "../config/data-source";
import { ICreateCredentialDto} from "../dtos/ICredentialDtos";
import { IRegisterUserDto, ICreateUserDto, ILoginUserDto } from "../dtos/IUserDtos";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import { CustomError } from "../utils/CustomError";
import { createCredentialService, validateCredentialService} from "./credentialsServices";


export const getUsersService = async():Promise<User[]>=> {
    const users:User[] = await UserRepository.find({
        relations:{
            credential:true,
            appointments:true
        }
    });
    return users;
}

export const getUsersByIdService = async(id:number):Promise<User> => {
    const userFound = await UserRepository.findById(id);
    return userFound;
}

export const registerNewUserService = async(userDataRegister:IRegisterUserDto):Promise<User>=>{  

    const queryRunner =  AppDataSource.createQueryRunner();
    await queryRunner.connect();
    try{
        const credentialData:ICreateCredentialDto = {
            username:userDataRegister.username,
            password:userDataRegister.password,
        }
        queryRunner.startTransaction();
        
        const newCredential = await createCredentialService(credentialData,queryRunner);
        const newUserData:ICreateUserDto = {
            name:userDataRegister.name,
            email:userDataRegister.email,
            birthdate:userDataRegister.birthdate,
            nDni:userDataRegister.nDni,
            credential: newCredential
        }
        const newUser = await UserRepository.create(newUserData);
        await queryRunner.manager.save(newUser);
        await queryRunner.commitTransaction();
        return newUser;
    }catch(err:any){
        await queryRunner.rollbackTransaction();
        throw new CustomError(err.message,500);
    }finally{   
        await queryRunner.release()
    }
}
export const loginUserService = async(userDataLogin:ILoginUserDto):Promise<User>=>{
    const id_user = await validateCredentialService(userDataLogin);
    const user_log = await UserRepository.findById(id_user);
    return user_log;
}