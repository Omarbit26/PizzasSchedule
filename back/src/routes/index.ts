import { Router} from "express";
import routerUsers from "./usersRouter";
import routerAppointments from "./appointmentsRouter";


const router:Router = Router();

router.use("/users",routerUsers);
router.use("/appointments",routerAppointments);



export default router