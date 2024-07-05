import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { CustomError } from "../utils/CustomError";


const UserRepository = AppDataSource.getRepository(User).extend({
    findById: async function(id:number):Promise<User>{
        const userFound = await this.findOne({
            where:{id},
            relations:{credential:false,appointments:true}
        })
        if(userFound) return userFound;
        else throw new CustomError("Invalid ID",404);
    }
});
export default UserRepository;