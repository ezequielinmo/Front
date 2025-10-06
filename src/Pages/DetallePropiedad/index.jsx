import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProperty, resetProperty } from '../../Redux/Actions';
import { InmobiliariaContext } from '../../Context';
import { capitalizar, formatMoney } from '../../Helps';
import ReactPlayer from "react-player";
import Carrusel from '../../Components/Carrusel';
import MapProp from '../../Components/MapaProp';
import ModalVideo from '../../Components/ModalVideo';
import RoomIcon from '@mui/icons-material/Room';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import Loading from '../../Components/Loading';
import ListaPropsSimilares from '../../Components/ListaPropsSimilares';
import './estilos.css';

function DetalleProp() {

    const loading = useSelector(state => state.loading);
    const { id } = useParams();
    const propiedad = useSelector(state => state.propiedad);
    const moneda = propiedad?.operacion?.[0]?.precios?.[0]?.moneda;
    const precio = propiedad?.operacion?.[0]?.precios?.[0]?.precio;
    const tipoProp = propiedad?.tipo?.nombre;
    const venta = propiedad?.operacion?.find(op => op?.operacion === "Venta");
    const alquiler = propiedad?.operacion?.find(op => op?.operacion === "Alquiler");
    const barrio = propiedad?.ubicacion?.barrio;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contexto = useContext(InmobiliariaContext);

    const [copiado, setCopiado] = useState(false);

    const handleClickAtras = () => {
        navigate(-1);
    };

    // 🟢 Función para compartir la propiedad
    const handleShare = async () => {
        const url = window.location.href;
        const title = propiedad?.tituloPublicacion || "Propiedad disponible";
        const text = `Mirá esta propiedad en Mendive Inmobiliaria: ${title}`;

        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch (error) {
                console.log("Compartir cancelado o falló:", error);
            }
        } else {
            navigator.clipboard.writeText(url);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000);
        }
    };

    // 🟣 Formatear descripción
    function formatearDescripcion(texto) {
        if (!texto || typeof texto !== 'string') return '';
        const partes = texto.split(/(?<=[.:])\s*/);
        const resultado = [];
        let enLista = false;

        for (let parte of partes) {
            const linea = parte.trim();
            if (!linea) continue;

            if (linea.endsWith(':')) {
                resultado.push(`<p>${linea}</p>`);
                enLista = true;
            } else if (enLista) {
                resultado.push(`<p class="p-viñeta">🔸 ${linea}</p>`);
            } else {
                resultado.push(`<div>${linea}</div>`);
            }
        }

        return resultado.join('');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getProperty(id));
        return () => { dispatch(resetProperty()); };
    }, [dispatch, id]);

    return (
        <>
            {
                loading ? (
                    <Loading />
                ) : (
                    <div className='contGralDetalle'>
                        <div className='cont-detail'>

                            {/* CABECERA */}
                            <div className='info-1'>
                                <div className='cont-btn_Y_tituilo-precio'>
                                    <div className='cont-btn_Y_tituilo'>
                                        <div className="cont-botones-header-detalle">
                                            {/* Botón atrás */}
                                            <button
                                                type='button'
                                                onClick={handleClickAtras}
                                                className='btn-volver'
                                            >
                                                <ArrowBackIcon />
                                            </button>

                                            {/* Botón compartir */}
                                            <button
                                                type='button'
                                                onClick={handleShare}
                                                className='btn-compartir'
                                            >
                                                <ShareIcon />
                                            </button>

                                            {copiado && (
                                                <span className="msg-copiado">¡Enlace copiado!</span>
                                            )}
                                        </div>

                                        {/* Título */}
                                        <div className='cont-titulo-detalle'>
                                            <p className='detalle-titulo-prop' data-translate>
                                                {capitalizar(propiedad.tituloPublicacion)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Dirección y precio */}
                                <div className='cont-btns-direccion'>
                                    <div className='cont-titulo-icono-direcc'>
                                        <RoomIcon sx={{ color: 'grey', marginLeft: '40px' }} />
                                        <p className='detalle-titulo-direccion'>
                                            {propiedad.direccion}
                                        </p>
                                    </div>
                                    <div className='cont-precio-detallee'>
                                        {venta && (
                                            <p className='precio-detalle-prop'>
                                                Venta: {venta.precios[0].moneda}{formatMoney(venta.precios[0].precio)}
                                            </p>
                                        )}
                                        {alquiler && (
                                            <p className='precio-detalle-prop'>
                                                Alquiler: {alquiler.precios[0].moneda}{formatMoney(alquiler.precios[0].precio)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* IMÁGENES Y DETALLE */}
                            <div className='cont-imgs-info'>
                                <div className='cont-imagenes'>
                                    <div className='cont-multimedia'>
                                        {propiedad?.video?.length &&
                                            <button
                                                onClick={() => contexto.handleIsOpen()}
                                                className='btn-video'
                                            >
                                                <VideocamIcon />
                                                Ver video
                                            </button>
                                        }
                                    </div>
                                    {
                                        propiedad?.imagenes
                                            ? <Carrusel imagenes={propiedad.imagenes} />
                                            : <p>No img</p>
                                    }
                                </div>

                                <div className='cont-caract-detalle'>
                                    <p className='titulo-caract-prop'>Detalle Propiedad</p>
                                    <div className='cont-caract-prop'>
                                        <div className='cont-p-caract'>
                                            <span className='span-tilde-verde'>✔</span>
                                            <p className='p-col-key'>Valor:</p>
                                            <p className='p-col-value'>
                                                {moneda}{precio}
                                            </p>
                                        </div>

                                        <div className='cont-p-caract'>
                                            <span className='span-tilde-verde'>✔</span>
                                            <p className='p-col-key'>Tipo Op:</p>
                                            <p className='p-col-value'>
                                                {venta?.operacion ? venta?.operacion : alquiler?.operacion}
                                            </p>
                                        </div>

                                        <div className='cont-p-caract'>
                                            <span className='span-tilde-verde'>✔</span>
                                            <p className='p-col-key'>Tipo:</p>
                                            <p className='p-col-value'>{propiedad.tipo?.nombre}</p>
                                        </div>

                                        <div className='cont-p-caract'>
                                            <span className='span-tilde-verde'>✔</span>
                                            <p className='p-col-key'>Ambientes:</p>
                                            <p className='p-col-value'>{propiedad.ambientes}</p>
                                        </div>

                                        <div className='cont-p-caract'>
                                            <span className='span-tilde-verde'>✔</span>
                                            <p className='p-col-key'>Dormitorios:</p>
                                            <p className='p-col-value'>{propiedad.dormitorios}</p>
                                        </div>

                                        <div className='cont-p-caract'>
                                            <span className='span-tilde-verde'>✔</span>
                                            <p className='p-col-key'>Baños:</p>
                                            <p className='p-col-value'>{propiedad.baños}</p>
                                        </div>

                                        <div className='cont-p-caract'>
                                            <span className='span-tilde-verde'>✔</span>
                                            <p className='p-col-key'>Dirección:</p>
                                            <p className='p-col-value'>{propiedad.direccionF}</p>
                                        </div>

                                        <div className='cont-p-caract'>
                                            <span className='span-tilde-verde'>✔</span>
                                            <p className='p-col-key'>Sup. Total:</p>
                                            <p className='p-col-value'>{propiedad.supTotal}{propiedad.unidadMedida}</p>
                                        </div>

                                        <div className='cont-p-caract'>
                                            <span className='span-tilde-verde'>✔</span>
                                            <p className='p-col-key'>Barrio:</p>
                                            <p className='p-col-value'>{barrio}</p>
                                        </div>

                                        <div className='cont-p-caract'>
                                            <span className='span-tilde-verde'>✔</span>
                                            <p className='p-col-key'>Expensas:</p>
                                            <p className='p-col-value'>{propiedad.expensas}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* DESCRIPCIÓN */}
                            <div className="cont-texto-descrip-detalle">
                                <p className='titulo-descrip-prop'>Detalle Propiedad</p>
                                <div
                                    className="subCont-texto-descrip-detalle"
                                    dangerouslySetInnerHTML={{ __html: formatearDescripcion(propiedad.descripcion) }}
                                />
                            </div>

                            {/* VIDEO */}
                            {propiedad?.videos?.length > 1 && (
                                <div className='cont-map-detalle'>
                                    <p className='p-titulo-mapa'>Video de la propiedad</p>
                                    <div className='cont-mapa-detalle'>
                                        <ReactPlayer
                                            url={propiedad.videos[0]}
                                            controls
                                            width="100%"
                                            height="360px"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* MAPA */}
                            <div className='cont-map-detalle'>
                                <p className='p-titulo-mapa'>Ubicación Propiedad</p>
                                <div className='cont-mapa-detalle'>
                                    <MapProp lat={propiedad.geoLat} lng={propiedad.geoLong} />
                                </div>
                            </div>

                            {/* PROPIEDADES SIMILARES */}
                            <div className="cont-lista-props-similares">
                                <h2 className='titulo-props-similares'>Propiedades recomendadas para tu búsqueda</h2>
                                <div className="cont-comp-props-similares">
                                    <ListaPropsSimilares
                                        precioProp={precio}
                                        tipoProp={tipoProp}
                                        vista={"ambas"}
                                        idProp={id}
                                    />
                                </div>
                            </div>

                            {/* MODAL VIDEO */}
                            {contexto.isOpenModalVideo &&
                                <ModalVideo video={propiedad.videos?.[0]?.player_url} />
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default DetalleProp;
