import React, { useRef } from 'react';
import Card from '../Card';
import BotonVerTodas from '../Botones/BotonVerTodas';
import './styles.css';

function ListaPropsDestacadas({ allPropsDestacadas, vista }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = container.offsetWidth * 0.8;

        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="cont-lista-props-destacadas">
            <div className="cont-titulos">
                <div className="linea-destacadas "></div>
                <h2 className="titulo-props-destacadas" data-translate>Propiedades destacadas</h2>
                <div className="linea-destacadas "></div>
            </div>
            {/* btn ver todas */}
            <div className='cont-btn-verTodas'>
                <BotonVerTodas />
            </div>
            {/* carrusel */}
            <div className="carrusel-botones">
                <button className="boton-carrusel" onClick={() => scroll('left')}>&#10094;</button>

                <div className="carrusel-container" ref={scrollRef}>
                    {allPropsDestacadas?.map((prop) => (
                        <div className="carrusel-item" key={prop.id}>
                            <Card {...prop} vista={vista} />
                        </div>
                    ))}
                </div>

                <button className="boton-carrusel" onClick={() => scroll('right')}>&#10095;</button>
            </div>
        </div>
    );
}

export default ListaPropsDestacadas;
