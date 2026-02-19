import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmprendimiento, resetEmprendimientos } from '../../Redux/Actions';
import { InmobiliariaContext } from '../../Context';
import ReactPlayer from 'react-player';
import Carrusel from '../../Components/Carrusel';
import MapProp from '../../Components/MapaProp';
import ModalVideo from '../../Components/ModalVideo';
import RoomIcon from '@mui/icons-material/Room';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PlaceIcon from '@mui/icons-material/Place';
import Loading from '../../Components/Loading';
import './styles.css';

function DetalleEmp() {
    const loading = useSelector((state) => state.loading);
    const emprendimiento = useSelector((state) => state.emprendimiento);
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contexto = useContext(InmobiliariaContext);

    const [copiado, setCopiado] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const videos = Array.isArray(emprendimiento?.videos) ? emprendimiento.videos : [];
    const imagenes = Array.isArray(emprendimiento?.imagenes) ? emprendimiento.imagenes : [];

    const urlVideoPrincipal = useMemo(() => {
        const firstVideo = videos[0];
        if (!firstVideo) return '';
        if (typeof firstVideo === 'string') return firstVideo;
        return firstVideo.player_url || firstVideo.url || '';
    }, [videos]);

    const descripcionFormateada = useMemo(() => {
        const descripcion = emprendimiento?.descripcion;
        if (!descripcion || typeof descripcion !== 'string') return '';

        const bloques = descripcion
            .split(/\n{2,}/)
            .map((b) => b.trim())
            .filter(Boolean);

        if (!bloques.length) return '';

        return bloques
            .map((bloque) => {
                const lineas = bloque
                    .split('\n')
                    .map((linea) => linea.trim())
                    .filter(Boolean);

                if (lineas.length > 1) {
                    const items = lineas
                        .map((linea) => `<li>${linea.replace(/^[-*]\s*/, '')}</li>`)
                        .join('');
                    return `<ul>${items}</ul>`;
                }
                return `<p>${lineas[0]}</p>`;
            })
            .join('');
    }, [emprendimiento?.descripcion]);

    const datosClave = useMemo(() => {
        return [
            { key: 'Titulo', value: emprendimiento?.tituloPublicacion },
            { key: 'Direccion', value: emprendimiento?.direccionF },
            { key: 'Ciudad', value: emprendimiento?.ubicacion?.nombre },
            { key: 'Latitud', value: emprendimiento?.geoLat },
            { key: 'Longitud', value: emprendimiento?.geoLong },
        ].filter((dato) => dato.value !== null && dato.value !== undefined && String(dato.value).trim() !== '');
    }, [emprendimiento]);

    const handleClickAtras = () => {
        navigate(-1);
    };

    const handleShare = useCallback(async () => {
        const url = window.location.href;
        const title = emprendimiento?.tituloPublicacion || 'Emprendimiento disponible';
        const text = `Mira este emprendimiento en Ezequiel Jose Estudio Inmobiliario: ${title}`;

        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch (error) {
                // cancelado por usuario
            }
        } else {
            await navigator.clipboard.writeText(url);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 1800);
        }
    }, [emprendimiento]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getEmprendimiento(id));
        return () => {
            dispatch(resetEmprendimientos());
        };
    }, [dispatch, id]);

    if (loading) return <Loading />;

    return (
        <div className='de-page'>
            <header className='de-header'>
                <div className='de-header__left'>
                    <button type='button' onClick={handleClickAtras} className='de-icon-btn' aria-label='Volver'>
                        <ArrowBackIcon />
                    </button>
                    <div className='de-title-wrap'>
                        <h1 className='de-title'>{emprendimiento?.tituloPublicacion || 'Detalle de emprendimiento'}</h1>
                        <div className='de-location'>
                            <RoomIcon sx={{ fontSize: 17 }} />
                            <span>{emprendimiento?.direccionF || 'Ubicacion no disponible'}</span>
                        </div>
                    </div>
                </div>

                <div className='de-header__actions'>
                    <button type='button' onClick={handleShare} className='de-icon-btn' aria-label='Compartir'>
                        <ShareIcon />
                    </button>
                    {copiado && <span className='de-toast'>Enlace copiado</span>}
                </div>
            </header>

            <main className='de-container'>
                <section className='de-grid'>
                    <article className='de-media-card'>
                        {urlVideoPrincipal && (
                            <div className='de-media-top'>
                                <button
                                    type='button'
                                    className='de-video-btn'
                                    onClick={() => contexto.handleIsOpen()}
                                >
                                    <VideocamIcon sx={{ fontSize: 18 }} />
                                    Ver video
                                </button>
                            </div>
                        )}

                        {imagenes.length ? (
                            <Carrusel imagenes={imagenes} />
                        ) : (
                            <div className='de-empty-media'>Sin imagenes disponibles</div>
                        )}
                    </article>

                    <aside className='de-side-card'>
                        <div className='de-side-header'>
                            <h2>Ficha rapida</h2>
                            <span className='de-chip'>
                                <ApartmentIcon sx={{ fontSize: 15 }} />
                                Emprendimiento
                            </span>
                        </div>

                        <div className='de-facts'>
                            {datosClave.map((dato) => (
                                <div className='de-fact-row' key={dato.key}>
                                    <span className='de-fact-key'>{dato.key}</span>
                                    <span className='de-fact-value'>{dato.value}</span>
                                </div>
                            ))}
                        </div>
                    </aside>
                </section>

                <section className='de-section'>
                    <h3 className='de-section-title'>Descripcion del emprendimiento</h3>
                    <div
                        className='de-card de-richtext'
                        dangerouslySetInnerHTML={{
                            __html: descripcionFormateada || '<p>Sin descripcion disponible.</p>',
                        }}
                    />
                </section>

                {urlVideoPrincipal && (
                    <section className='de-section'>
                        <h3 className='de-section-title'>Video</h3>
                        <div className='de-card'>
                            <div className='de-video-frame'>
                                <ReactPlayer
                                    url={urlVideoPrincipal}
                                    controls
                                    width='100%'
                                    height='100%'
                                />
                            </div>
                        </div>
                    </section>
                )}

                <section className='de-section'>
                    <h3 className='de-section-title'>Ubicacion</h3>
                    <div className='de-card de-map-card'>
                        <div className='de-map-label'>
                            <PlaceIcon sx={{ fontSize: 16 }} />
                            <span>{emprendimiento?.direccionF || 'Punto de referencia no disponible'}</span>
                        </div>
                        <MapProp lat={emprendimiento?.geoLat} lng={emprendimiento?.geoLong} />
                    </div>
                </section>
            </main>

            {contexto.isOpenModalVideo && <ModalVideo video={urlVideoPrincipal} />}
        </div>
    );
}

export default DetalleEmp;
