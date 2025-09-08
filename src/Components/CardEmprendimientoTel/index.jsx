import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { capitalizar } from '../../Helps';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './styles.css';

function CardEmprendimientoTel({ id, imagenes, direccionF, locacion, tituloPublicacion, tipo, descripcion }) {

    //estado para el hover
    const [showDetail, setShowDetail] = useState(false);

    return (
        <div className='cont-card-empTel'>
            {/* img + animacion + abre detalle */}
            <NavLink to={`/detalle/${id}`} className='navLink-card'>
                <div
                    onMouseEnter={() => setShowDetail(true)}
                    onMouseLeave={() => setShowDetail(false)}
                >
                    {/* imagen */}
                    <div className='card-image'>
                        <img src={imagenes[0].imagen} alt='not found' className='card-img' />
                    </div>

                    {/* msj detalle si hay hover */}
                    <div className={`detail ${showDetail ? 'show' : ''}`}>
                        <p className='palabra-abre-detalle' data-translate>Detalle</p>
                    </div>
                </div>
            </NavLink>

            {/* Titulo y direccion */}
            <div className='card-info1-empTel'>
                <div className='cont-titulo-publicacion-card-Emp'>
                    <div className='cont-titulo-card'>
                        <h5 className='card-tituloPublicacion-Emp' data-translate>{capitalizar(tituloPublicacion)}</h5>
                    </div>
                    <div className='cont-direcc-icono-card'>
                        <LocationOnIcon sx={{ color: 'grey' }} />
                        <p className='direcc-card' data-translate>{direccionF}</p>
                    </div>
                </div>
            </div>
            
            {/* descrip */}
            <div className='card-info2-empTel'>
                <p className='descripcion-cardEmpTel'>{descripcion}</p>
            </div>
        </div>
    )
}

export default CardEmprendimientoTel;
