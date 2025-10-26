import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmprendimiento, resetEmprendimientos } from '../../Redux/Actions';
import { InmobiliariaContext } from '../../Context';
import ReactPlayer from "react-player";
import Carrusel from '../../Components/Carrusel';
import MapProp from '../../Components/MapaProp';
import ModalVideo from '../../Components/ModalVideo';
import RoomIcon from '@mui/icons-material/Room';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import Loading from '../../Components/Loading';
import './styles.css';

function DetalleProp() {

    const loading = useSelector(state => state.loading);
    const { id } = useParams();  //let id = props.match.params.id 
    const emprendimiento = useSelector(state => state.emprendimiento);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contexto = useContext(InmobiliariaContext);

    const [copiado, setCopiado] = useState(false);

    const handleClickAtras = () => {
        navigate(-1);
    };

    // Función para compartir la propiedad
    const handleShare = async () => {
        const url = window.location.href;
        const title = emprendimiento?.tituloPublicacion || "Emprendimiento disponible";
        const text = `Mirá este emprendimiento en Ezequiel José Estudio Inmobiliario: ${title}`;

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

    // Formatear descripción
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
        dispatch(getEmprendimiento(id));
        return () => { dispatch(resetEmprendimientos()); };
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
                                                {emprendimiento.tituloPublicacion}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Dirección y precio */}
                                <div className='cont-btns-direccion'>
                                    <div className='cont-titulo-icono-direcc'>
                                        <RoomIcon sx={{ color: 'white' }} />
                                        <p className='detalle-titulo-direccion'>
                                            {emprendimiento.direccionF}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* IMÁGENES Y DETALLE */}
                            <div className='fondoEmp'>
                                <div className='cont-imagenes'>
                                {
                                    emprendimiento?.videos?.length &&
                                    <div className='cont-multimedia'>
                                        <button
                                            onClick={() => contexto.handleIsOpen()}
                                            className='btn-video'
                                        >
                                            <VideocamIcon />
                                            Ver video
                                        </button>
                                    </div>
                                }
                                {
                                    emprendimiento?.imagenes
                                        ? <Carrusel imagenes={emprendimiento.imagenes} />
                                        : <p>No img</p>
                                }
                            </div>
                            </div>

                            {/* DESCRIPCIÓN */}
                            <div className="cont-texto-descrip-detalle">
                                <p className='titulo-descrip-prop'>Detalle Propiedad</p>
                                <div
                                    className="subCont-texto-descrip-detalle"
                                    dangerouslySetInnerHTML={{ __html: formatearDescripcion(emprendimiento.descripcion) }}
                                />
                            </div>

                            {/* VIDEO */}
                            {emprendimiento?.videos?.length > 1 && (
                                <div className='cont-map-detalle'>
                                    <p className='p-titulo-mapa'>Video del Emprendimiento</p>
                                    <div className='cont-mapa-detalle'>
                                        <ReactPlayer
                                            url={emprendimiento.videos[0]}
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
                                    <MapProp lat={emprendimiento.geoLat} lng={emprendimiento.geoLong} />
                                </div>
                            </div>

                            {/* MODAL VIDEO */}
                            {contexto.isOpenModalVideo &&
                                <ModalVideo video={emprendimiento.videos?.[0]?.player_url} />
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default DetalleProp;
