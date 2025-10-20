import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { formatMoney } from '../../Helps';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import RoomIcon from '@mui/icons-material/Room';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { InmobiliariaContext } from '../../Context';
import './styles.css';

function Card({
    id,
    direccionF,
    cantCocheras,
    operacion,
    imagenes,
    tituloPublicacion,
    ambientes,
    dormitorios,
    supTotal,
    supCubierta,
    supDescubierta,
    unidadMedida,
    tipo,
    destacadaEnWeb,
    vista
}) {
    const venta = operacion.find(op => op.operacion === "Venta");
    const alquiler = operacion.find(op => op.operacion === "Alquiler");

    const [indexImg, setIndexImg] = useState(0);
    const { favoritos, toggleFavorito } = useContext(InmobiliariaContext);

    const nextImg = (e) => {
        e.stopPropagation();
        setIndexImg((prev) => (prev + 1) % imagenes.length);
    };

    const prevImg = (e) => {
        e.stopPropagation();
        setIndexImg((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    };

    const esFavorito = favoritos.some((f) => f.id === id);

    const handleFavoritoClick = (e) => {
        e.preventDefault(); // evita redirección
        e.stopPropagation();
        const prop = {
            id,
            direccionF,
            cantCocheras,
            operacion,
            imagenes,
            tituloPublicacion,
            ambientes,
            dormitorios,
            unidadMedida,
            tipo
        };
        toggleFavorito(prop);
    };

    return (
        <div className="contCardHome">
            <div className="card-image-container">
                <div className="card-image">
                    <img src={imagenes[indexImg].original} alt="not found" className="card-img" />
                    {imagenes.length > 1 && (
                        <>
                            <button className="arrow arrow-left" onClick={prevImg}>
                                <ArrowBackIosNewIcon fontSize="small" />
                            </button>
                            <button className="arrow arrow-right" onClick={nextImg}>
                                <ArrowForwardIosIcon fontSize="small" />
                            </button>
                        </>
                    )}
                </div>
            </div>

            <NavLink to={`/detalle/${id}`} className="cont-info-link">
                <div className="card-info1">
                    <div className="cont-titulo-publicacion-card">
                        <div className="cont-titulo-card">
                            <h5 className="tituloPublicacion">
                                {tituloPublicacion}
                            </h5>
                        </div>
                        <div className="cont-direcc-icono-card">
                            <LocationOnIcon sx={{ color: 'grey' }} />
                            <p className="direcc-card">{direccionF}</p>
                        </div>
                    </div>

                    <div className="cont-precio-fav">
                        <div className='cont-precio'>
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

                        {/*Botón Favorito */}
                        <div className="cont-fav" onClick={handleFavoritoClick}>
                            {esFavorito ? (
                                <FavoriteIcon sx={{ color: 'red', fontSize: 27 }} />
                            ) : (
                                <FavoriteBorderIcon sx={{ color: 'gray', fontSize: 27 }} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="card-info2">
                    <div className="div-info2">
                        <HomeIcon />
                        <p className="info2" data-translate>Sup. Tot</p>
                        <p className="info2">{supTotal}m<sup>2</sup></p>
                    </div>

                    {tipo?.nombre === "Terreno" ? (
                        <>
                            <div className="div-info2">
                                <RoomIcon />
                                <p className="info2" data-translate>Sup. Cub</p>
                                <p className="info2">{supCubierta}m<sup>2</sup></p>
                            </div>
                            <div className="div-info2">
                                <RoomIcon />
                                <p className="info2" data-translate>Sup. Desc</p>
                                <p className="info2">{supDescubierta}m<sup>2</sup></p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="div-info2">
                                <TagIcon />
                                <p className="info2" data-translate>Ambientes</p>
                                <p className="info2">{ambientes}</p>
                            </div>
                            <div className="div-info2">
                                <HotelIcon />
                                <p className="info2" data-translate>Dormitorios</p>
                                <p className="info2">{dormitorios}</p>
                            </div>
                            <div className="div-info2">
                                <DirectionsCarIcon />
                                <p className="info2" data-translate>Cocheras</p>
                                <p className="info2">{cantCocheras}</p>
                            </div>
                        </>
                    )}
                </div>

                <div className="detail">
                    <p className="palabra-abre-detalle" data-translate>Detalle</p>
                </div>
            </NavLink>
        </div>
    );
}

export default Card;
