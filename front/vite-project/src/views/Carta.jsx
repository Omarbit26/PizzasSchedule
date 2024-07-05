import imagen1 from "../assets/carta/imagen1.webp"
import imagen2 from "../assets/carta/imagen2.webp"
import imagen3 from "../assets/carta/imagen3.webp"
import imagen4 from "../assets/carta/imagen4.webp"
import imagen5 from "../assets/carta/imagen5.webp"
import imagen6 from "../assets/carta/imagen6.webp"
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';


const Carta = () => {

    const platos = [
        { name: "Antipastos" , imagen: imagen1, descripcion: " ", precio: "$23.00" },
        { name: "Criollos" , imagen:imagen2, descripcion: " ", precio: "$24.00 " },
        { name: "Bocaditos Chinos" , imagen: imagen3, descripcion: " ", precio: "$26.00" },
        { name: "Ensaladas" , imagen: imagen4, descripcion: " ", precio: "$30.00" },
        { name: "Fiambres" , imagen: imagen5, descripcion: " ", precio: "$35.00 " },
        { name: "Dulces" , imagen: imagen6, descripcion: " ", precio: "$15.00" },
    ]

    return(
        <div className="container mt-5">
            <div className="row">
                {
                    platos.map(plato=>{
                        return(
                            <Card  key={plato.name} className="col-md-4 mb-3">
                                <Card.Img variant="top" src={plato.imagen} />
                                <Card.Body>
                                    <Card.Title>{plato.name}</Card.Title>
                                        <Card.Text>
                                        {plato.descripcion}
                                        {plato.precio}
                                        </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Carta ; 