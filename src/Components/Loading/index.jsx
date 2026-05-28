import React from 'react';
import Logo from '../../Images/logo_ej_negro_1.png';
import './estilos.css';

function Loading() {
    return (
        <div className='cont-loading'>
            <div className="loader-card">
                <div className="loader-brand">
                    <img src={Logo} alt="Ezequiel Jose Estudio Inmobiliario" className="loader-logo" />
                    <div>
                        <p className="loader-kicker">Ezequiel Jose</p>
                        <h2>Estudio Inmobiliario</h2>
                    </div>
                </div>

                <div className="loader-blueprint" aria-hidden="true">
                    <span className="loader-line loader-line-a" />
                    <span className="loader-line loader-line-b" />
                    <span className="loader-line loader-line-c" />
                    <span className="loader-window loader-window-a" />
                    <span className="loader-window loader-window-b" />
                    <span className="loader-window loader-window-c" />
                    <span className="loader-key" />
                </div>

                <div className="loader-copy">
                    <p>Preparando propiedades disponibles</p>
                    <div className="loader-progress">
                        <span />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading
