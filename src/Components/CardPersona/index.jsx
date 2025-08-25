import React, { useState } from 'react';
import PopUpPersona from '../PopUpPersona';
import './styles.css';

function CardPersona({ imgPersona, nombre, apellido, texto }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={`cont-principal-cardP ${hovered ? "hovered" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className='cont-img-persona'>
                <img src={imgPersona} alt='not found' className='img-persona-card' />
            </div>
            <div className='cont-inf-persona'>
                <p className='nombre-persona'>{nombre} {apellido}</p>
                <p className='texto-persona'>{texto}</p>
            </div>

            {hovered && (
                <PopUpPersona
                    nombre={nombre}
                    apellido={apellido}
                    texto="Información adicional de la persona."
                />
            )}
        </div>
    );
}

export default CardPersona;
