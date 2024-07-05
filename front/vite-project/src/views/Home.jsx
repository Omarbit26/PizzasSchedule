import Carrousel from "../components/Carrousel/Carrousel";
import { useSelector } from "react-redux";


const Home = () =>{

    const user = useSelector((state)=>state.userActive)
    

    return(
        <div>
            <Carrousel/>
        </div>
    )
}

export default Home;