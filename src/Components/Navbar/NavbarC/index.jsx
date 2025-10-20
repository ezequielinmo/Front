import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { InmobiliariaContext } from '../../../Context';
import './style.css';

function NavbarC() {
    const { favoritos } = useContext(InmobiliariaContext);

    return (
        <div className='cont-navbar-C'>
            <ul className='ul-navbarInf'>
                <li><NavLink to='/ventas' className='navlink-navbarInf'>Venta</NavLink></li>
                <li><NavLink to='/alquiler' className='navlink-navbarInf'>Alquiler</NavLink></li>
                <li><NavLink to='/emprendimientos' className='navlink-navbarInf'>Emprendimientos</NavLink></li>
                <li><NavLink to='/tasaciones' className='navlink-navbarInf'>Tasaciones</NavLink></li>
                <li><NavLink to='/nosotros' className='navlink-navbarInf'>La empresa</NavLink></li>
                <li><NavLink to='/contacto' className='navlink-navbarInf'>Contacto</NavLink></li>
                <li>
                    <NavLink to='/favoritos' className='navlink-navbarInf'>
                        <div className='cont-fav-contadorFav'>
                            <FavoriteIcon />
                            <p className='contadorFav'>{favoritos.length}</p>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default NavbarC;
