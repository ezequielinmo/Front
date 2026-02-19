import React, { useMemo, useState } from 'react';
import { capitalizar, formatMoney } from '../../Helps';
import { NavLink } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './styles.css';

const CardChicaImagenGrande = ({
    id,
    direccionF,
    operacion = [],
    imagenes = [],
    tituloPublicacion,
    vista,
}) => {
    const [imgIndex, setImgIndex] = useState(0);
    const [showDetail, setShowDetail] = useState(false);

    const venta = useMemo(
        () => operacion.find((op) => op?.operacion === 'Venta'),
        [operacion]
    );
    const alquiler = useMemo(
        () => operacion.find((op) => op?.operacion === 'Alquiler'),
        [operacion]
    );

    const operacionLabel = useMemo(() => {
        if (operacion.length > 1) return 'Venta / Alquiler';
        if (operacion[0]?.operacion === 'Venta') return 'Venta';
        if (operacion[0]?.operacion === 'Alquiler') return 'Alquiler';
        return 'Propiedad';
    }, [operacion]);

    const precioLabel = useMemo(() => {
        if (vista === 'Venta' && venta?.precios?.[0]) {
            return `${venta.precios[0].moneda} ${formatMoney(venta.precios[0].precio)}`;
        }
        if (vista === 'Alquiler' && alquiler?.precios?.[0]) {
            return `${alquiler.precios[0].moneda} ${formatMoney(alquiler.precios[0].precio)}`;
        }
        if (vista === 'ambas' && venta?.precios?.[0] && alquiler?.precios?.[0]) {
            return `${venta.precios[0].moneda} ${formatMoney(venta.precios[0].precio)} / ${alquiler.precios[0].moneda} ${formatMoney(alquiler.precios[0].precio)}`;
        }
        if (vista === 'ambas' && venta?.precios?.[0]) {
            return `${venta.precios[0].moneda} ${formatMoney(venta.precios[0].precio)}`;
        }
        if (vista === 'ambas' && alquiler?.precios?.[0]) {
            return `${alquiler.precios[0].moneda} ${formatMoney(alquiler.precios[0].precio)}`;
        }
        return 'Consultar precio';
    }, [vista, venta, alquiler]);

    const handleNext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (imagenes.length <= 1) return;
        setImgIndex((prev) => (prev + 1) % imagenes.length);
    };

    const handlePrev = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (imagenes.length <= 1) return;
        setImgIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    };

    const imgSrc = imagenes[imgIndex]?.original || imagenes[imgIndex]?.url || '';

    return (
        <article className='cg-card'>
            <div className='cg-media'>
                <NavLink
                    to={`/detalle/${id}`}
                    className='cg-link'
                    onMouseEnter={() => setShowDetail(true)}
                    onMouseLeave={() => setShowDetail(false)}
                >
                    {imgSrc ? (
                        <img src={imgSrc} alt={tituloPublicacion || 'propiedad'} className='cg-image' />
                    ) : (
                        <div className='cg-image cg-image--empty'>Sin imagen</div>
                    )}

                    <div className={`cg-overlay ${showDetail ? 'is-visible' : ''}`}>
                        <span>Ver detalle</span>
                    </div>
                </NavLink>

                <div className='cg-badge cg-badge--op'>{operacionLabel}</div>
                <div className='cg-badge cg-badge--price'>{precioLabel}</div>

                {imagenes.length > 1 && (
                    <>
                        <button className='cg-nav cg-nav--left' onClick={handlePrev} aria-label='Imagen anterior'>
                            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
                        </button>
                        <button className='cg-nav cg-nav--right' onClick={handleNext} aria-label='Imagen siguiente'>
                            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                        </button>
                    </>
                )}
            </div>

            <div className='cg-content'>
                <h3 className='cg-title' data-translate>
                    {capitalizar(tituloPublicacion || '')}
                </h3>
                <p className='cg-address' data-translate>
                    <LocationOnIcon sx={{ color: '#9aa3b4', fontSize: 16 }} />
                    <span>{direccionF || 'Direccion no disponible'}</span>
                </p>
            </div>
        </article>
    );
};

export default CardChicaImagenGrande;
