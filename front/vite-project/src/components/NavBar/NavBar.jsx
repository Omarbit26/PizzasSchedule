import 'bootstrap/dist/css/bootstrap.min.css';
import { Link} from 'react-router-dom';
import logo from "../../assets/fondo_imagen.jpg"
import styles from "./NavBar.module.css"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/reducer';
import { useNavigate } from 'react-router-dom';
const NavBar = () => {

    const user = useSelector((state)=>state.userActive)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickLogout = () => {
        const confirmExit = window.confirm('¿Estás seguro de cerrar sesión?');
        if(confirmExit){
            dispatch(clearUser());
            navigate("/")
        }
        
    }

    return(

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                <div className={styles.containerLogo}>
                    <img className={styles.img_log} alt="logo" src={logo}/>
                    <p>Yoshua Buffets</p>
                </div>

                <div className="container">
                    <div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Inicio</Link>
                            </li>

                            {user.name &&  <li className="nav-item">
                                <Link className="nav-link" to="/appointments">Mis Reservas</Link>
                            </li> }

                            {user.name && <li className="nav-item">
                                <Link className="nav-link" to="/createappointment">Reservar</Link>
                            </li>
                            }

                            <li className="nav-item">
                            <Link className="nav-link" to="/aboutus">Nosotros</Link>
                            </li>

                            <li className="nav-item">
                            <Link className="nav-link" to="/carta">La Carta</Link>
                            </li>
                            
                            
                        </ul>
                    </div>
                </div>
                <div className={styles.container_sesion_register}>
                        {!user.name && <Link className= {styles.button_sesion} to="/login">Ingresar</Link>}
                        {!user.name && <Link className= {styles.button_register} to="/register">Registrarse</Link>}
                        {user.name && (
                            <div className={styles.login_container}>
                                <div style={{color:"white", marginBottom:"1em"}}>{user.name}</div>
                                <div><button className={styles.button_exit} onClick={handleClickLogout}>Salir</button></div>
                            </div>
                        )}
                        
                </div>
            </nav>
        </div>
    )
    
};

export default NavBar