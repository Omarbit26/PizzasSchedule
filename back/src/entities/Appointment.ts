import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


export enum Status{
    ACTIVE ="active",
    CANCELLED="cancelled"
}

@Entity({
    name:"appointments"
})
export class Appointment{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @Column()
    time:String

    @Column()
    nMesa:String

    @Column({
        type: "enum",
        enum: Status,
        default: Status.ACTIVE
    })
    status:Status

    @ManyToOne(()=>User,(user)=>user.appointments)
    user:User
}

