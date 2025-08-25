import React from 'react';
//import NoHayProps from '../NoHayProps';
import CardPropsRectangular from '../CardPropsRectangular';
import './styles.css';

function ListaPropiedades({ allProps, vista, onClickMapaProps }) {

    return (
        <div className="lista-emprendimientos">
            {
                allProps?.map(prop => (
                    <CardPropsRectangular key={prop.id} {...prop} vista={vista}/>
                ))
            }
        </div>
    )
}

export default ListaPropiedades