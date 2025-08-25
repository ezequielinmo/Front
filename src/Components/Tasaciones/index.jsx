import React from 'react';
import Flecha from '../FlechaAbajo';
import "./styles.css";

function Tasaciones() {
    return (
        <div className='cont-gral-tasaciones'>
            <h1 className='titulo-tasaciones'>Tasaciones</h1>

            <div className="item-tasacion">
                <h3>¿Cómo tasamos?</h3>
                <Flecha />
            </div>

            <div className="item-tasacion">
                <h3>Explicamos el mercado</h3>
                <Flecha />
            </div>

            <div className="item-tasacion">
                <h3>Comparables por la zona</h3>
                <Flecha />
            </div>

            <div className="item-tasacion">
                <h3>Comparables vendidos</h3>
                <Flecha />
            </div>

            <div className="item-tasacion">
                <h3>Visita personal</h3>
            </div>
        </div>
    )
}

export default Tasaciones;
