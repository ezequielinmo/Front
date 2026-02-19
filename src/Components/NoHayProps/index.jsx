import React from 'react';
import './estilos.css';

function NoHayProps({
    title = 'Por el momento no hay propiedades para mostrar',
    description = 'Proba cambiando los filtros o volve mas tarde para ver nuevas publicaciones.',
}) {
    return (
        <div className='cont-noHayProps'>
            <div className='overlay-noHayProps'>
                <span className='badge-noHayProps'>Sin resultados</span>
                <h2 className='titulo-noHayProps' data-translate>{title}</h2>
                <p className='desc-noHayProps' data-translate>{description}</p>
                <div className='tips-noHayProps'>
                    <span data-translate>- Ajusta tipo de propiedad u operacion.</span>
                    <span data-translate>- Revisa nuevamente en unos minutos.</span>
                </div>
            </div>
        </div>
    );
}

export default NoHayProps;
