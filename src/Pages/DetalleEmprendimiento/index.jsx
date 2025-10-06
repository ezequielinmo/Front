import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmprendimiento, resetEmprendimientos, } from '../../Redux/Actions';
import { InmobiliariaContext } from '../../Context';
import { capitalizar } from '../../Helps';
import VideocamIcon from '@mui/icons-material/Videocam';
import MapProp from '../../Components/MapaProp';
import ModalVideo from '../../Components/ModalVideo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loading from '../../Components/Loading';
import Carrusel from '../../Components/Carrusel';
import RoomIcon from '@mui/icons-material/Room';

function DetalleEmp(){

    const loading = useSelector(state => state.loading);
    const { id } = useParams();  //let id = props.match.params.id 
    const emprendimiento = useSelector(state => state.emprendimiento);
    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const contexto = useContext(InmobiliariaContext); 

    // Función para reemplazar puntos por saltos de línea
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

    const handleClickAtras = (e) => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/'); // Ruta por defecto si no hay historial previo.
        }
    };

    useEffect(() => {
        // Desplazarse hacia la parte superior de la página al cargar el componente
        window.scrollTo(0, 0);
    }, [dispatch, id]);

    useEffect(()=>{
        console.log("entré")
        dispatch(getEmprendimiento(id));

        return () => { dispatch(resetEmprendimientos()); }
    },[dispatch, id]);

    return (
        <>
            {
                loading ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <div className='contGralDetalle'>
                        <div className='cont-fondo-trama'></div> {/* para fondo color o img */}
                        <div className='cont-detail'>
                            {/* datos principales */}
                            <div className='info-1'>
                                <div className='cont-btn_Y_tituilo-precio'>
                                    <div className='cont-btn_Y_tituilo'>
                                        {/* btn atrás */}
                                        <div>
                                            <button
                                                type='button'
                                                onClick={handleClickAtras}
                                                className='btn-volver'
                                            >
                                                <ArrowBackIcon />
                                            </button>
                                        </div>
                                        {/* Titulo prop */}
                                        <div className='cont-titulo-detalle'>
                                            <p className='detalle-titulo-prop' data-translate>
                                                {capitalizar(emprendimiento.tituloPublicacion)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='cont-btns-direccion'>
                                    {/* dirección */}
                                    <div className='cont-titulo-icono-direcc'>
                                        <RoomIcon sx={{ color: 'grey', marginLeft: '40px' }} />
                                        <p className='detalle-titulo-direccion'>
                                            {emprendimiento.direccionF}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* carrusel y formulario */}
                            <div className='cont-imgs-info'>
                                {/* carrusel */}
                                <div className='cont-imagenes'>
                                    {/* botones multimedia */}
                                    <div className='cont-multimedia'>
                                        {/* btn-video */}
                                        {
                                            emprendimiento?.video?.length &&
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
                                        emprendimiento?.imagenes
                                            ?
                                            <Carrusel imagenes={emprendimiento.imagenes} />
                                            :
                                            <p>No img</p>
                                    }
                                </div>

                                <div className='cont-caract-detalle'>
                                    <p className='titulo-caract-prop'>Detalle Propiedad</p>
                                    {/* <div className='cont-caract-prop'>
                                        <div className='cont-p-caract'>
                                            <p className='p-col-key' data-translate>Ambientes:</p>
                                            <p className='p-col-value'>{propiedad.ambientes}</p>
                                        </div>
                                        <div className='cont-p-caract'>
                                            <p className='p-col-key' data-translate>Dormitorios:</p>
                                            <p className='p-col-value'>{propiedad.dormitorios}</p>
                                        </div>
                                        <div className='cont-p-caract'>
                                            <p className='p-col-key' data-translate>Baños:</p>
                                            <p className='p-col-value'>{propiedad.baños}</p>
                                        </div>
                                        <div className='cont-p-caract'>
                                            <p className='p-col-key' data-translate>Tipo Op:</p>
                                            {
                                                propiedad.operacion?.map((o, i) => {
                                                    return (
                                                        <div key={o.operacion_id}>
                                                            <p className='p-col-value' data-translate>{propiedad.operacion[i]?.operacion} /</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='cont-p-caract'>
                                            <p className='p-col-key' data-translate>Tipo:</p>
                                            <p className='p-col-value' data-translate>{propiedad.tipo?.nombre}</p>
                                        </div>
                                        <div className='cont-p-caract'>
                                            <p className='p-col-key' data-translate>Sup. Total:</p>
                                            <p className='p-col-value'>{propiedad.supTotal}{propiedad.unidadMedida}</p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            {/* descrip */}
                            <div className="cont-texto-descrip-detalle">
                                <p className='titulo-descrip-prop'>Detalle Propiedad</p>
                                <div
                                    className="subCont-texto-descrip-detalle"
                                    dangerouslySetInnerHTML={{ __html: formatearDescripcion(emprendimiento.descripcion) }}
                                />
                            </div>

                            {/* google map */}
                            <div className='cont-map-detalle'>
                                <p className='p-titulo-mapa' data-translate>Ubicacion Propiedad</p>
                                <div className='cont-mapa-detalle'>
                                    <MapProp lat={emprendimiento.geoLat} lng={emprendimiento.geoLong} />
                                </div>
                            </div>

                            {/* Modal Video */}
                            {
                                contexto.isOpenModalVideo &&
                                <ModalVideo video={emprendimiento.videos[0]?.player_url} />
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default DetalleEmp;