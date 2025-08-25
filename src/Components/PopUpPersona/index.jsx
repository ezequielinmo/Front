import React from 'react';
import './styles.css';

function PopUpPersona({ nombre, apellido, texto }) {
    return (
        <div className="popup-persona">
            <h3>{nombre} {apellido}</h3>
            <p>{texto}</p>
        </div>
    );
}

export default PopUpPersona;
