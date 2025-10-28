import React, { useEffect } from 'react';
import FormularioContacto from '../../Components/FormularioContacto'
import MapaPropiedades from '../../Components/MapProps';
import RoomIcon from '@mui/icons-material/Room';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './estilos.css';



function Contactanos() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='contGralFormulario'>
            <div className='cont-info-ofi-Y-formulario'>
                <div className='cont-info-ofi'>
                    <div className='cont-dataOficina'>
                        <h2 style={{ margin: '5px 0 0 0' }}>Nuestra oficina</h2>
                        <div className='sub-cont-info-Contacto-1'>
                            <RoomIcon sx={{ marginRight: '5px' }} />
                            <p >Viamonte 3084 - Mar del Plata</p>
                        </div>
                        <div className='sub-cont-info-Contacto-1'>
                            <EmailIcon sx={{ marginRight: '5px' }} />
                            <p>info@ezequieljosepropiedades.com</p>
                        </div>
                        <div className='sub-cont-info-Contacto-1'>
                            <CallIcon sx={{ marginRight: '5px' }} />
                            <p>2235554552</p>
                        </div>
                        <div className='divLinks'>
                            <h2>Seguinos</h2>
                            <div className='cont-iconos-redes'>
                                <a
                                    href="https://www.instagram.com/ezequieljose_propiedades/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ marginLeft: '5px' }}
                                >
                                    <InstagramIcon sx={{ color: 'white' }} />
                                </a>
                                <a
                                    href='http://api.whatsapp.com/send?phone=2235554552'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ marginLeft: '5px' }}
                                >
                                    <WhatsAppIcon sx={{ color: 'white' }} />
                                </a>
                            </div>
                        </div>
                        {/* mapa */}
                        <div className='cont-mapa-contacto'>
                            <MapaPropiedades lat={-38.019081} lng={-57.543701} />
                        </div>
                    </div>

                    <div className='cont-formulario-page'>
                        <FormularioContacto />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contactanos