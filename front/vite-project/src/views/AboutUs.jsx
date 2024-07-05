import React from 'react';
import styles from "./AboutUs.module.css"

function AboutUs() {
  return (
    <div className={styles.aboutus}>
      <h2>Nuestra Historia</h2>
      <p>
        El restaurante "Sabor Peruano" se enorgullece de ofrecer auténtica comida criolla peruana
        que deleita los paladares de nuestros clientes desde 1995. Nuestra historia comenzó en las
        calles de Lima, Perú, donde nuestros fundadores aprendieron las recetas tradicionales de
        generaciones pasadas. Con el deseo de compartir nuestra pasión por la comida peruana, nos
        trasladamos a la hermosa ciudad de [Nombre de la Ciudad] donde hemos estado sirviendo a
        nuestra comunidad con platos deliciosos y memorables desde entonces.
      </p>

      <h2>Reseñas</h2>
      <div className="review">
        <p>"¡La mejor comida peruana que he probado! Los sabores auténticos y la hospitalidad
        excepcional hacen que cada visita sea una experiencia inolvidable. Recomiendo encarecidamente
        probar el ceviche y el lomo saltado. Definitivamente volveré una y otra vez". - Cliente Feliz</p>
      </div>

      <h2>Ubicación</h2>
      <div className="map">
        {/* Aquí iría el código para mostrar un mapa de Google Maps con la ubicación del restaurante */}
        {/* Puedes obtener el código de incrustación del mapa desde Google Maps */}
        <iframe
          title="Ubicación del Restaurante"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3128.9867646010195!2d-76.95126818466225!3d38.982396979560525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7e2f9e195ad%3A0xd47d6ee00de543fc!2sMachu%20Picchu%20Peruvian%20Restaurant!5e0!3m2!1sen!2sus!4v1648006170314!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default AboutUs;