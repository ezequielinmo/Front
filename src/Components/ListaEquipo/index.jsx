import React from 'react'
import { ArrayEquipo } from '../../Helps/ArrayEquipo'
import CardPersona from '../CardPersona';
import './styles.css';

function ListaEquipo() {
    const arrEq = ArrayEquipo;

    return (
        <div className='cont-listaEq'>
            {
                arrEq?.map(p => {
                    return(
                        <CardPersona key={p.nombre} {...p} />
                    )
                })
            }
        </div>
    )
}

export default ListaEquipo