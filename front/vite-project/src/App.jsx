import Home from "./views/Home"
import MisTurnos from "./views/MisTurnos"
import Login from "./views/Login"
import Register from "./views/Register"
import { Routes, Route, useLocation } from "react-router-dom"
import ErrorPage from "./views/ErrorPage"
import NavBar from "./components/NavBar/NavBar"
import AboutUs from "./views/AboutUs"
import CreateAppointment from "./views/CreateAppointment"
import Carta from "./views/Carta"
import Footer from "./components/Footer/Footer"

function App() {
   const location = useLocation();
   return (
      <>
      {
         <NavBar/>
      }
         <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/appointments" element={<MisTurnos/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/aboutus" element={<AboutUs/>} />
            <Route path="/createappointment" element={<CreateAppointment/>} />
            <Route path="/carta" element={<Carta/>}/>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<ErrorPage/>} />
         </Routes>
         {
            <Footer/>
         }
      </>
      

   )
}

export default App
