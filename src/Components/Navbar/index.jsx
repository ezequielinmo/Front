import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarA from './NavbarA';
import NavbarB from './NavbarB';
import NavbarC from './NavbarC';
import './styles.css';


function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 1;
            console.log("ScrollY:", window.scrollY, "| scrolled:", isScrolled);
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Ejecuta al montar

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    // Determina la clase según scroll y si está en home
    const navbarClass = isHome
        ? scrolled ? 'navbar scrolled' : 'navbar'
        : 'navbar scrolled';

    return (
        <nav className={navbarClass}>
            <div className='sub-cont-navbar'>
                <div className='cont-navbar-navA'>
                    <NavbarA />
                </div>
                <div className='cont-navbars-byc'>
                    <div className='cont-navbar-navB'>
                        <NavbarB />
                    </div>
                    <div className='cont-navbar-navC'>
                        <NavbarC />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
