import 'bootstrap/dist/css/bootstrap.min.css';
import { Link} from 'react-router-dom';

const ErrorPage = () => {


    return (
        <div className="container text-center mt-5">
            <h1 className="display-4" style={{color:"white"}} >404 - Página no encontrada</h1>
            <p className="lead" style={{color:"white"}}>La página que estás buscando no existe.</p>
            <Link to="/" className="btn btn-primary" >Ir a la página de inicio</Link>
        </div>
        
    )
}

export default ErrorPage;