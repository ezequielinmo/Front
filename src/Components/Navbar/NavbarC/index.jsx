import React from 'react'
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './style.css'

function NavbarC() {
    return (
        <div className='cont-navbar-C'>
            {/* items */}
            <ul className='ul-navbarInf'>
                <li data-translate>
                    <NavLink to='/ventas' className={'navlink-navbarInf'}>
                        Venta
                    </NavLink>
                </li>
                <li data-translate>
                    <NavLink to='/alquiler' className={'navlink-navbarInf'}>
                        Alquiler
                    </NavLink>
                </li>
                <li data-translate>
                    <NavLink to='/emprendimientos' className={'navlink-navbarInf'}>
                        Emprendimientos
                    </NavLink>
                </li>
                <li data-translate>
                    <NavLink to='/tasaciones' className={'navlink-navbarInf'}>
                        Tasaciones
                    </NavLink>
                </li>
                <li data-translate>
                    <NavLink to='/nosotros' className={'navlink-navbarInf'}>
                        La empresa
                    </NavLink>
                </li>
                <li data-translate>
                    <NavLink to='/contacto' className={'navlink-navbarInf'}>
                        Contacto
                    </NavLink>
                </li>
                <li data-translate>
                    <NavLink to='/favoritos' className={'navlink-navbarInf'}>
                        <div className='cont-fav-contadorFav'>
                            <FavoriteIcon />
                            <p className='contadorFav'>{2}</p>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default NavbarC