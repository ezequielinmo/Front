import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.css';

function BotonVerTodas({url}) {
    return (
        <NavLink to={url} className='link-ver-todas'>
            <button className='btn-ver-todas'>
                Ver todas <p>&#10095;</p>
            </button>
        </NavLink>
    )
}

export default BotonVerTodas