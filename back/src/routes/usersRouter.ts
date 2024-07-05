import { Router } from "express";
import { registerNewUser, getUserById, getUsers, loginUser } from "../controllers/usersController";
import { get } from "https";


const routerUsers: Router = Router();

routerUsers.get("/",getUsers);
routerUsers.get("/:id",getUserById);
routerUsers.post("/register",registerNewUser);
routerUsers.post("/login",loginUser);


export default routerUsers;