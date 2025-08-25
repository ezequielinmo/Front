import React from 'react';
import LogoFooter from '../../Images/logo_ej_negro_1.png';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { NavLink } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import './styles.css';


function Footer() {
    return (
        <div className='cont-principal-footer'>
            <div className='cont-secundario-footer'>
                <div className='col-1-footer'>
                    <div className='cont-Logo-Foot'>
                        <img src={LogoFooter} alt='not found' className='logo-footeer' />
                    </div>
                    <div className='cont-textos-col-1'>
                        <div className='cont-direcc-foot'>
                            <LocationOnIcon sx={{fontSize: '18px'}}/>
                            <p className='p-texto-col-1'>Viamonte 3084</p>
                        </div>
                        <div className='cont-direcc-foot'>
                            <CallIcon sx={{fontSize: '18px'}}/>
                            <p className='p-texto-col-1'>2235554552</p>
                        </div>
                    </div>
                </div>
                <div className='col-2-footer'>
                    <div className='cont-titulo-footer'>
                        <h3 className='titulo-redes-foot'>Nuestras Redes</h3>
                    </div>
                    <div className='cont-redes-foot'>
                        <InstagramIcon />
                        <FacebookIcon />
                        <WhatsAppIcon />
                    </div>
                </div>
                <div className='col-3-footer'>
                    <div className='cont-titulo-col-3'>
                        <h3 className='titulo-redes-foot'>¿Qué estas buscando?</h3>
                    </div>
                    <div className='cont-items-foot'>
                        <ul>
                            <li className='li-foot'>
                                <NavLink to={'/venta'} className={'link-foot-item'}>
                                    Venta
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/alquiler'} className={'link-foot-item'}>
                                    Alquiler
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/emprendimientos'} className={'link-foot-item'}>
                                    Emprendimientos
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/venta'} className={'link-foot-item'}>
                                    La Empresa
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/venta'} className={'link-foot-item'}>
                                    Contacto
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/venta'} className={'link-foot-item'}>
                                    Favoritos
                                </NavLink>
                            </li>
                            {/* tipos de prop */}
                            <li>
                                <NavLink to={'/venta'} className={'link-foot-item'}>
                                    Departamentos
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/venta'} className={'link-foot-item'}>
                                    Casas
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/venta'} className={'link-foot-item'}>
                                    Lotes
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='cont-textos-inferiores'>
                <div className='cont-texto-col-1-Foot'>
                    <p className='texto-izq-foot'>
                        Todas las medidas enunciadas son meramente orientativas,
                        las medidas exactas serán las que se expresen en el respectivo título de propiedad de cada inmueble.
                        Todas las fotos, imágenes y videos son meramente ilustrativos y no contractuales.
                        Los precios enunciados son meramente orientativos y no contractuales.
                    </p>
                </div>
                <div className='cont-texto-izq-Foot'>
                    <p className='texto-izq-foot'>
                        © 2025 Ezequiel Jose Estudio Inmobiliario. DESARROLLO WEB: Marcos Forastiere
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer