//componente menú hamburguesa
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function MenuHamburguesa() {
    
    const [menu, setMenu] = useState(false);
    const menuRef = useRef(null); // Referencia para el menú hamburguesa
    const menuItemsRef = useRef([]); // Referencia para los elementos del menú

    const toggleMenu = () => {
        setMenu(!menu);
    }

    // Cierra el menú hamburguesa al hacer clic o tocar fuera de él
    useEffect(() => {
        function handleClickOutside(event) {
            // Verificar si el clic o toque es fuera del menú
            if (
                menuRef.current && !menuRef.current.contains(event.target) && 
                !menuItemsRef.current.some(item => item.contains(event.target))
            ) {
                setMenu(false); // Cierra el menú si no es clic en el menú
            }
        }

        // Escuchar el evento pointerdown (compatible con mouse y táctil)
        document.addEventListener('pointerdown', handleClickOutside);
        return () => {
            // Limpiar el evento cuando el componente se desmonta
            document.removeEventListener('pointerdown', handleClickOutside);
        };
    }, []);


    return (
        <div className='cont-menuHamburguesa'>
            <div 
                className={`cont-menuHamburguesa__btn ${menu ? 'open' : ''}`} 
                onClick={toggleMenu}
                ref={menuRef}
            >
                <div className='linea-menuHamburguesa'></div>
                <div className='linea-menuHamburguesa'></div>
                <div className='linea-menuHamburguesa'></div>
            </div>
            <div className={`cont-menuHamburguesa__menu ${menu ? 'open' : 'ocultar'}`}>
                <ul className='ul-menuHamburguesa'>
                    <li onClick={toggleMenu}>
                        <Link to='/' ref={el => menuItemsRef.current[0] = el} data-translate>Inicio</Link>
                    </li>
                    <li onClick={toggleMenu}>
                        <Link to='/ventas' ref={el => menuItemsRef.current[1] = el} data-translate>Ventas</Link>
                    </li>
                    <li onClick={toggleMenu}>
                        <Link to='/alquiler' ref={el => menuItemsRef.current[2] = el} data-translate>Alquileres</Link>
                    </li>
                    <li onClick={toggleMenu}>
                        <Link to='/emprendimientos' ref={el => menuItemsRef.current[3] = el} data-translate>Emprendimientos</Link>
                    </li>
                    {/* <li onClick={toggleMenu}>
                        <Link to='/internacional' ref={el => menuItemsRef.current[4] = el} data-translate>Internacional</Link>
                    </li> */}
                    <li data-translate>
                        <Link to='/favoritos' className={'navlink-navbarInf'} data-translate>Favoritos</Link>
                    </li>
                    <li onClick={toggleMenu}>
                        <Link to='/nosotros' ref={el => menuItemsRef.current[5] = el} data-translate>Quienes Somos</Link>
                    </li>
                    <li onClick={toggleMenu}>
                        <Link to='/contacto' ref={el => menuItemsRef.current[6] = el} data-translate>Contacto</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenuHamburguesa