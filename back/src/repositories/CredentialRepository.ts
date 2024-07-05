import { DataSource } from "typeorm";
import { AppDataSource, UserModel } from "../config/data-source";
import { IValidateCredentialDto } from "../dtos/ICredentialDtos";
import { Credential } from "../entities/Credential";

import { CustomError } from "../utils/CustomError";
import UserRepository from "./UserRepository";


const CredentialRepository = AppDataSource.getRepository(Credential).extend({
    validationCredential: async function (credentialData:IValidateCredentialDto):Promise<number> {
        const foundCredential = await this.findOneBy({
            username:credentialData.username,password:credentialData.password
        })
        if(foundCredential){
             const credential_id=foundCredential.id
             const user  =  await UserRepository
             .createQueryBuilder('user')
             .innerJoin('user.credential', 'credential')
             .where("credential.id = :id", { id:credential_id})
             .getOne();
             if(user ) return user.id;
             else throw new CustomError("No coinciden credenciales",400);
        }
        else throw new CustomError("No coinciden credenciales",400)
    }
});

export default CredentialRepository;