import Carousel from 'react-bootstrap/Carousel';
import image1 from '../../assets/slide11-modified.jpg';
import image2 from '../../assets/slide22-modified.jpg';
import image3 from '../../assets/slide33-modified.jpg';


function Carrousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className='d-block w-100' alt="Fisrt slide" src={image1}/>
        <Carousel.Caption>
          <h1>Comida Criolla</h1>
          <br></br>
          <br></br>
          <br></br>
          <p>Deleite los más exquisitos platillos de comida criolla peruana</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        
        <img className='d-block w-100' alt="Second slide" src={image2}/>
        <Carousel.Caption>
          <h1>Pescados y Mariscos </h1>
          <br></br>
          <br></br>
          <br></br>
          <p>Somo especilitas preparando ceviche carretillero</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        
        <img className='d-block w-100' alt="Third slide" src={image3}/>
        <Carousel.Caption>
        <h1>Bebidas peruanas</h1>
          <br></br>
          <br></br>
          <br></br>
          <p>
            Acompaña de tus comidas con una gran variedad de piscos y cervezas artezanales
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
  );
}
export default Carrousel;