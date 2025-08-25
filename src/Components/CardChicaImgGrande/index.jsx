import React, { useState } from 'react';
import { capitalizar, formatMoney } from '../../Helps';
import { NavLink } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './styles.css';

const CardChicaImagenGrande = ({
    id,
    direccionF,
    cantCocheras,
    operacion,
    imagenes = [],
    tituloPublicacion,
    ambientes,
    dormitorios,
    supTotal,
    supCubierta,
    supDescubierta,
    unidadMedida,
    tipo,
    vista
}) => {
    const [imgIndex, setImgIndex] = useState(0);
    const [showDetail, setShowDetail] = useState(false);

    const venta = operacion.find(op => op.operacion === "Venta");
    const alquiler = operacion.find(op => op.operacion === "Alquiler");

    const handleNext = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setImgIndex((prev) => (prev + 1) % imagenes.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setImgIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    };

    return (
        <div className="cards-scroll-wrapper">
            <div className="cont-card-imgGrande">
                <div className="cont-imgG">
                    {/* NavLink que solo cubre la imagen */}
                    <NavLink to={`/detalle/${id}`} className='navLink-car'>
                        <div
                            onMouseEnter={() => setShowDetail(true)}
                            onMouseLeave={() => setShowDetail(false)}
                        >
                            <div className='card-image-chica'>
                                <img
                                    src={imagenes[imgIndex]?.original}
                                    alt='not found'
                                    className='card-imgGrande'
                                />
                            </div>

                            <div className={`detail-chica ${showDetail ? 'show-chica' : ''}`}>
                                <p className='palabra-abre-detalle' data-translate>Detalle</p>
                            </div>
                        </div>
                    </NavLink>

                    {/* Badges sobre la imagen */}
                    <div className="badge operacionCG">
                        {operacion.length > 1 ? (
                            "Venta/Alq"
                        ) : operacion[0]?.operacion === 'Venta' ? (
                            "Venta"
                        ) : operacion[0]?.operacion === 'Alquiler' ? (
                            "Alquiler"
                        ) : null}
                    </div>

                    <div className="badge precioCG">
                        {vista === "Venta" && venta && (
                            <p className='precio-cardG'>
                                {venta.precios[0]?.moneda} {formatMoney(venta.precios[0]?.precio)}
                            </p>
                        )}
                        {vista === "Alquiler" && alquiler && (
                            <p className='precio-cardG'>
                                {alquiler.precios[0]?.moneda} {formatMoney(alquiler.precios[0]?.precio)}
                            </p>
                        )}
                        {vista === "ambas" && venta && alquiler && (
                            <p className='precio-cardG'>
                                {venta.precios[0]?.moneda} {formatMoney(venta.precios[0]?.precio)} / {alquiler.precios[0]?.moneda} {formatMoney(alquiler.precios[0]?.precio)}
                            </p>
                        )}
                        {vista === "ambas" && venta && !alquiler && (
                            <p className='precio-cardG'>
                                {venta.precios[0]?.moneda} {formatMoney(venta.precios[0]?.precio)}
                            </p>
                        )}
                        {vista === "ambas" && alquiler && !venta && (
                            <p className='precio-cardG'>
                                {alquiler.precios[0]?.moneda} {formatMoney(alquiler.precios[0]?.precio)}
                            </p>
                        )}
                    </div>

                    {/* Flechas fuera del NavLink */}
                    {imagenes.length > 1 && (
                        <>
                            <button className="img-nav left" onClick={handlePrev}>‹</button>
                            <button className="img-nav right" onClick={handleNext}>›</button>
                        </>
                    )}
                </div>

                <div className='cont-titulo-publicacion-cardIG'>
                    <div className='cont-titulo-card'>
                        <h3 className='tituloPublicacion-cardIG' data-translate>{capitalizar(tituloPublicacion)}</h3>
                    </div>
                    <div className='cont-direcc-icono-card'>
                        <LocationOnIcon sx={{ color: 'grey' }} />
                        <p className='direcc-card' data-translate>{direccionF}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardChicaImagenGrande;
