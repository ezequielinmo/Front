import React, { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams, useLocation, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProperty, resetProperty } from "../../Redux/Actions";
import { InmobiliariaContext } from "../../Context";
import { capitalizar, formatMoney } from "../../Helps";
import {  } from "react-router-dom";
import Carrusel from "../../Components/Carrusel";
import MapProp from "../../Components/MapaProp";
import ModalVideo from "../../Components/ModalVideo";
import RoomIcon from "@mui/icons-material/Room";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import Loading from "../../Components/Loading";
import ListaPropsSimilares from "../../Components/ListaPropsSimilares";
import "./styles.css";

function DetalleProp() {
    const loading = useSelector((state) => state.loading);
    const { id } = useParams();
    const propiedad = useSelector((state) => state.propiedad);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const contexto = useContext(InmobiliariaContext);

    const [copiado, setCopiado] = useState(false);

    const venta = useMemo(
        () => propiedad?.operacion?.find((op) => op?.operacion === "Venta"),
        [propiedad]
    );
    const alquiler = useMemo(
        () => propiedad?.operacion?.find((op) => op?.operacion === "Alquiler"),
        [propiedad]
    );

    const precioVenta = venta?.precios?.[0];
    const precioAlq = alquiler?.precios?.[0];

    const precioRef = propiedad?.operacion?.[0]?.precios?.[0];
    const tipoProp = propiedad?.tipo?.nombre;
    const barrio = propiedad?.ubicacion?.barrio;

    const handleShare = useCallback(async () => {
        const url = window.location.href;
        const title = propiedad?.tituloPublicacion || "Propiedad disponible";
        const text = `Mirá esta propiedad en Mendive Inmobiliaria: ${title}`;

        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch (error) {
                // usuario canceló o falló
            }
        } else {
            await navigator.clipboard.writeText(url);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 1800);
        }
    }, [propiedad]);

    // ✅ Volver SIN perder filtros: si venís desde listado con search, volvemos ahí
    const handleClickAtras = () => {
        const backTo = location.state?.backTo;

        if (backTo) {
            navigate(backTo);
            return;
        }

        // fallback: si hay historial real, volvemos
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        // fallback final: ruta del listado
        navigate("/propiedades");
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getProperty(id));
        return () => dispatch(resetProperty());
    }, [dispatch, id]);

    const facts = useMemo(() => {
        if (!propiedad) return [];
        return [
            { k: "Tipo", v: propiedad?.tipo?.nombre },
            { k: "Operación", v: venta?.operacion || alquiler?.operacion },
            { k: "Ambientes", v: propiedad?.ambientes },
            { k: "Dormitorios", v: propiedad?.dormitorios },
            { k: "Baños", v: propiedad?.baños },
            { k: "Sup. total", v: propiedad?.supTotal ? `${propiedad.supTotal}${propiedad.unidadMedida || ""}` : null },
            { k: "Barrio", v: barrio },
            { k: "Expensas", v: propiedad?.expensas },
            { k: "Dirección", v: propiedad?.direccionF || propiedad?.direccion },
        ].filter((x) => x.v !== null && x.v !== undefined && String(x.v).trim() !== "");
    }, [propiedad, venta, alquiler, barrio]);

    if (loading) return <Loading />;

    return (
        <div className="dp-page">
            {/* Header / Hero mini */}
            <header className="dp-header">
                <div className="dp-header__left">
                    <button type="button" className="dp-iconBtn" onClick={handleClickAtras} aria-label="Volver">
                        <ArrowBackIcon />
                    </button>

                    <div className="dp-titleWrap">
                        <h1 className="dp-title">{capitalizar(propiedad?.tituloPublicacion || "")}</h1>
                        <div className="dp-subtitle">
                            <RoomIcon sx={{ fontSize: 18 }} />
                            <span>{propiedad?.direccion}</span>
                        </div>
                    </div>
                </div>

                <div className="dp-header__right">
                    {precioVenta && (
                        <div className="dp-price">
                            <span className="dp-price__label">Venta</span>
                            <span className="dp-price__value">
                                {precioVenta.moneda}
                                {formatMoney(precioVenta.precio)}
                            </span>
                        </div>
                    )}
                    {precioAlq && (
                        <div className="dp-price">
                            <span className="dp-price__label">Alquiler</span>
                            <span className="dp-price__value">
                                {precioAlq.moneda}
                                {formatMoney(precioAlq.precio)}
                            </span>
                        </div>
                    )}

                    <div className="dp-actions">
                        <button type="button" className="dp-iconBtn" onClick={handleShare} aria-label="Compartir">
                            <ShareIcon />
                        </button>
                        {copiado && <span className="dp-toast">¡Enlace copiado!</span>}
                    </div>
                </div>
            </header>

            {/* Main grid */}
            <main className="dp-container">
                <section className="dp-grid">
                    {/* Left: media */}
                    <div className="dp-mediaCard">
                        {propiedad?.videos?.length > 0 && (
                            <div className="dp-mediaTop">
                                <button
                                    type="button"
                                    className="dp-videoBtn"
                                    onClick={() => contexto.handleIsOpen()}
                                >
                                    <VideocamIcon sx={{ fontSize: 18 }} />
                                    Ver video
                                </button>
                            </div>
                        )}


                        <div className="dp-carousel">
                            {propiedad?.imagenes?.length ? (
                                <Carrusel imagenes={propiedad.imagenes} />
                            ) : (
                                <div className="dp-empty">Sin imágenes</div>
                            )}
                        </div>
                    </div>

                    {/* Right: sticky details */}
                    <aside className="dp-side">
                        <div className="dp-card dp-card--sticky">
                            <div className="dp-cardHeader">
                                <h2 className="dp-cardTitle">Detalle</h2>
                                {precioRef?.precio && (
                                    <div className="dp-chipPrice">
                                        {precioRef.moneda}
                                        {formatMoney(precioRef.precio)}
                                    </div>
                                )}
                            </div>

                            <div className="dp-facts">
                                {facts.map((f) => (
                                    <div key={f.k} className="dp-fact">
                                        <span className="dp-fact__dot">✔</span>
                                        <span className="dp-fact__k">{f.k}:</span>
                                        <span className="dp-fact__v">{f.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </section>

                {/* Descripción */}
                <section className="dp-section">
                    <h3 className="dp-sectionTitle">Descripción</h3>
                    <div className="dp-sectionCard dp-richText"
                        dangerouslySetInnerHTML={{ __html: propiedad?.descripcion || "" }}
                    />
                </section>

                {/* Video embebido (si querés mostrarlo también fuera del modal) */}
                {propiedad?.videos?.length > 0 && (
                    <section className="dp-section">
                        <h3 className="dp-sectionTitle">Video</h3>
                        <div className="dp-sectionCard">
                            {propiedad?.videos?.[0]?.description && (
                                <p className="dp-muted">{propiedad.videos[0].description}</p>
                            )}
                            <div className="dp-videoFrame">
                                <iframe
                                    width="100%"
                                    height="420"
                                    src={`${propiedad.videos[0].player_url}?autoplay=0&rel=0`}
                                    title="Video de la propiedad"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </section>
                )}

                {/* Mapa */}
                <section className="dp-section">
                    <h3 className="dp-sectionTitle">Ubicación</h3>
                    <div className="dp-sectionCard dp-mapCard">
                        <MapProp lat={propiedad?.geoLat} lng={propiedad?.geoLong} />
                    </div>
                </section>

                {/* Similares */}
                <section className="dp-section">
                    <h3 className="dp-sectionTitle">Recomendadas para tu búsqueda</h3>
                    <div className="dp-sectionCard">
                        <ListaPropsSimilares
                            precioProp={precioRef?.precio}
                            tipoProp={tipoProp}
                            vista={"ambas"}
                            idProp={id}
                        />
                    </div>
                </section>
            </main>

            {/* Modal video */}
            {contexto.isOpenModalVideo && (
                <ModalVideo video={propiedad?.videos?.[0]?.player_url} />
            )}
        </div>
    );
}

export default DetalleProp;
