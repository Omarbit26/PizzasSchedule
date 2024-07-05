import { QueryRunner } from "typeorm";
import { ICreateCredentialDto, IValidateCredentialDto} from "../dtos/ICredentialDtos";
import { Credential } from "../entities/Credential";
import CredentialRepostory from "../repositories/CredentialRepository"
import UserRepository from "../repositories/UserRepository";


 export const createCredentialService = async(credentialData:ICreateCredentialDto,queryRunner:QueryRunner):Promise<Credential>=>{
  const newCredential = await CredentialRepostory.create(credentialData);
  await queryRunner.manager.save(newCredential)
  return newCredential
 }

 export const validateCredentialService = async(credentialData:IValidateCredentialDto):Promise<number>=>{
    const id_user = await CredentialRepostory.validationCredential(credentialData);
    return id_user;
 }

