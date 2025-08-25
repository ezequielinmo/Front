import React from 'react'
import Video from '../../Images/videoLand.mp4'
import './styles.css'

function LandigA() {
    return (
        <div className='cont-landing-A'>
            <video className='cont-video' autoPlay muted loop>
                <source src={Video} type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
            </video>

            {/* flecha que señala hacia abajo compuesta por dos palitos blancos con movimiento hacia arriba y abjo */}
            <div className='cont-flecha-home'>
                <div className='flecha-home'>
                    <div className='linea linea1'></div>
                    <div className='linea linea2'></div>
                </div>
            </div>
        </div>
    )
}

export default LandigA