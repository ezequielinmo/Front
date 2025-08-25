import React from 'react';
import Equipo from '../../Images/Equipo.jpg';
import './styles.css';

function Institucional() {
    return (
        <div className='cont-principal-institucional'>
            <div className='cont-institucional'>
                <h1 className='titulo-inst'>Nuestro Staff</h1>
                <img src={Equipo} alt='not found' className='img-institucional'/>
                <p className='texto-institucional'>
                    La capacitación constante y la curiosidad sobre las nuevas tendencias 
                    me permiten trabajar hoy pensando en el mercado de mañana.
                </p>
            </div>
        </div>
    )
}

export default Institucional