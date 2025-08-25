import React from 'react';
import Equipo from '../../Images/Equipo.jpg';
import './styles.css';

function Institucional2() {
    return (
        <div className='cont-principal-institucional'>
            <div className='cont-institucional'>
                <h1 className='titulo-inst'>Nuestro Staff</h1>
                <div className='cont-texto-E-img'>
                    <div className='cont-texto'>
                        <p className='texto-institucional'>
                            La capacitación constante y la curiosidad sobre las nuevas tendencias
                            me permiten trabajar hoy pensando en el mercado de mañana.
                        </p>
                    </div>
                    <div className='cont-img-Equipo'>
                        <img src={Equipo} alt='not found' className='img-institucional' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Institucional2