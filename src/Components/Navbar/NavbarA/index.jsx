import React from 'react'
import { NavLink } from 'react-router-dom';
import Logo from '../../../Images/logo_ej_negro_1.png'
import MenuHamburgesa from '../../MenuHamburguesa';
import './style.css';

function NavbarA() {
    return (
        <div className='cont-navbar-A'>
            {/* menú hambur */}
            <div className='cont-menu-hambur'>
                <MenuHamburgesa />
            </div>
            {/* logo */}
            <div className='cont-logo-navA'>
                <NavLink to='/' className='navLink-navbarA'>
                    <img src={Logo} alt={'not found'} className='logo-navbarA' />
                </NavLink>
            </div>
        </div>
    )
}

export default NavbarA