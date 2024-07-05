import { Credential } from "../entities/Credential"

export interface IRegisterUserDto{
    name: string,
    email:string,
    birthdate:Date,
    nDni:number,
    username:string,
    password:string,
}

export interface ICreateUserDto{
    name: string,
    email:string,
    birthdate:Date,
    nDni:number,
    credential: Credential
}

export interface ILoginUserDto{
    username: string,
    password: string
}