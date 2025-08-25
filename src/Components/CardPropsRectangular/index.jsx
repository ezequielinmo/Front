import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { capitalizar, formatMoney } from '../../Helps';
import Favorito from '../Botones/Favoritos';
import RoomIcon from '@mui/icons-material/Room';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import IconoSup from '../../Images/Iconos/IconoSup';
import './styles.css';

function CardPropsRectangular({
    id, direccionF, operacion, imagenes, tituloPublicacion, ambientes, ubicacion, descripcion,
    dormitorios, unidadMedida, cantCocheras, supTotal, tipo, supCubierta, supDescubierta, vista
}) {
    const [showDetail, setShowDetail] = useState(false);
    //busco el tipo de operacion
    const venta = operacion.find(op => op.operacion === "Venta");
    const alquiler = operacion.find(op => op.operacion === "Alquiler");

    return (
        <div className="card-horizontal propRect">
            {/* Imagen con hover  y operacion*/}
            <NavLink to={`/detalle/${id}`} className="card-horizontal-img-container">
                <div
                    onMouseEnter={() => setShowDetail(true)}
                    onMouseLeave={() => setShowDetail(false)}
                    className="img-wrapper"
                >
                    <img src={imagenes[0].original} alt="propiedad" className="card-horizontal-img" />
                    {showDetail && <div className="detail-hover"><p>Detalle</p></div>}
                    {/* operacion */}
                    <div className='cont-operacion'>
                        {operacion.length > 1 ? (
                            <h2 className='titulo-card' >Venta/Alq</h2>
                        ) : operacion[0]?.operacion === 'Venta' ? (
                            <h2 className='titulo-card' >Venta</h2>
                        ) : operacion[0]?.operacion === 'Alquiler' ? (
                            <h2 className='titulo-card' >Alquiler</h2>
                        ) : null}
                    </div>
                </div>
            </NavLink>

            {/* Info a la derecha */}
            <div className="card-horizontal-content">
                {/* titulo y Btn-fav */}
                <div className='cont-propTitulo'>
                    <h2 className="card-propTitulo">{capitalizar(tituloPublicacion)}</h2>
                    <Favorito
                        id={id}
                        direccionF={direccionF}
                        cantCocheras={cantCocheras}
                        operacion={operacion}
                        imagenes={imagenes}
                        tituloPublicacion={tituloPublicacion}
                        ambientes={ambientes}
                        dormitorios={dormitorios}
                        unidadMedida={unidadMedida}
                        tipo={tipo}
                    />
                </div>

                {/* precio y direcciòn*/}
                <div className='cont-info-2-card-props'>
                    <div className='cont-preciocard-prop'>
                        {vista === "Venta" && venta && (
                            <p className='precio'>
                                {venta.precios[0]?.moneda} {formatMoney(venta.precios[0]?.precio)}
                            </p>
                        )}

                        {vista === "Alquiler" && alquiler && (
                            <p className='precio'>
                                {alquiler.precios[0]?.moneda} {formatMoney(alquiler.precios[0]?.precio)}
                            </p>
                        )}

                        {vista === "ambas" && venta && alquiler && (
                            <p className='precio'>
                                {venta.precios[0]?.moneda} {formatMoney(venta.precios[0]?.precio)} / {alquiler.precios[0]?.moneda} {formatMoney(alquiler.precios[0]?.precio)}
                            </p>
                        )}

                        {vista === "ambas" && venta && !alquiler && (
                            <p className='precio'>
                                {venta.precios[0]?.moneda} {formatMoney(venta.precios[0]?.precio)}
                            </p>
                        )}

                        {vista === "ambas" && alquiler && !venta && (
                            <p className='precio'>
                                {alquiler.precios[0]?.moneda} {formatMoney(alquiler.precios[0]?.precio)}
                            </p>
                        )}
                    </div>
                    <div className='cont-card-prop-deirecc'>
                        <RoomIcon />
                        <span>{direccionF} - {ubicacion.barrio}</span>
                    </div>
                </div>

                {/* descripción */}
                <div className="cont-info-3-card-props">
                    <p className='p-card-props-descrip'>{descripcion}</p>
                </div>

                {/* info sup - amb - dorm - coch */}
                <div className='cont-info-4-card-props'>
                    <div className='div-info-3'>
                        <HomeIcon />
                        <p className='p-info-prop-card' data-translate>Sup. Tot</p>
                        <p className='p-info-prop-card'>
                            {supTotal}m
                            <sup>2</sup>
                        </p>
                    </div>

                    {
                        tipo?.nombre === "Terreno" ? (
                            <>
                                <div className='div-info-3'>
                                    <IconoSup />
                                    <p className='p-info-prop-card' data-translate>Sup. Cub</p>
                                    <p className='p-info-prop-card'>
                                        {supCubierta}m
                                        <sup>2</sup>
                                    </p>
                                </div>
                                <div className='div-info-3'>
                                    <IconoSup />
                                    <p className='p-info-prop-card' data-translate>Sup. Desc</p>
                                    <p className='p-info-prop-card'>
                                        {supDescubierta}m
                                        <sup>2</sup>
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='div-info-3'>
                                    <TagIcon />
                                    <p className='p-info-prop-card' data-translate>Ambientes</p>
                                    <p className='p-info-prop-card'>{ambientes}</p>
                                </div>

                                <div className='div-info-3'>
                                    <HotelIcon />
                                    <p className='p-info-prop-card' data-translate>Dormitorios</p>
                                    <p className='p-info-prop-card'>{dormitorios}</p>
                                </div>

                                <div className='div-info-3'>
                                    <DirectionsCarIcon />
                                    <p className='p-info-prop-card' data-translate>Cocheras</p>
                                    <p className='p-info-prop-card'>{cantCocheras}</p>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default CardPropsRectangular;
