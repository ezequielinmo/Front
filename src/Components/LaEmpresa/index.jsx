import React from 'react';
import { ezequiel } from '../../Helps/ArrayEquipo';
import Video from '../../Images/videoLand.mp4';
import ListaEquipo from '../ListaEquipo';
import CardPersona from '../CardPersona';
import './styles.css';

function LaEmpresa() {
    const eze = ezequiel;

    return (
        <div className='cont-principal-laEmp'>
            {/* oscurece el video */}
            <div className='overlay-video-laEmp'></div>
            <div className='cont-secundario-laEmp'>
                {/* video con overlay */}
                <div className='cont-video-laEmp'>
                    <video className='cont-video' autoPlay muted loop>
                        <source src={Video} type="video/mp4" />
                        Tu navegador no soporta la etiqueta de video.
                    </video>
                </div>

                {/* textos sobre el video */}
                <div className='cont-texto-LaEmp'>
                    <h1 className='texto-h1-LaEmp'>Ezequiel Jose Estudio Inmobiliario</h1>
                    <h2 className='texto-h2-LaEmp'>Hacemos foco en lo que el cliente nos pide</h2>
                    <h3 className='texto-h3-LaEmp'>Y a partir de ahí nos contactamos con MARCOS</h3>
                    <h3 className='texto-h3-LaEmp'>de Ortiz Lizmar propiedades y él nos consigue todo!!</h3>
                </div>

                {/* título decorado */}
                <div className="cont-titulos">
                    <div className="linea-destacadas "></div>
                        <h2 className="titulo-props-destacadas" >Nuestro Staff</h2>
                    <div className="linea-destacadas "></div>
                </div>

                {/* primera card separada */}
                <div className='cont-LaEmp-Ezequiel'>
                    <CardPersona {...eze} />
                </div>

                {/* resto del equipo */}
                <div className='cont-LaEmp-Equipo'>
                    <ListaEquipo />
                </div>
            </div>
        </div>
    );
}

export default LaEmpresa;
