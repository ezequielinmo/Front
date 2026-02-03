import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const LandingProps = ({ allProps }) => {

    const navigate = useNavigate();

    function cardVariant(i) {
        // 5 layouts distintos. Si solo hay 4, igual va joya.
        const variants = ["hero", "tall", "wide", "small", "mid"];
        return variants[i % variants.length];
    }

    // Tomo 5 si hay, si no 4, si no lo que haya
    const destacadas = useMemo(() => {
        if (!Array.isArray(allProps)) return [];
        const slice = allProps?.slice(0, 4);
        return slice.length >= 3 ? slice : allProps?.slice(0, 3);
    }, [allProps]);

    if (!destacadas?.length) return null;

    return (
        <section className="pd-wrap">
            <header className="pd-header">
                <h2 className="pd-title">
                    <span className="pd-title-line pd-title-soft">Conocé nuestras propiedades</span>
                </h2>

                <p className="pd-subtitle">Estás a un click de encontrar tu próxima propiedad.</p>
            </header>

            <div className="pd-grid">
                {destacadas?.map((p, i) => {
                    const titulo = p?.tituloPublicacion;
                    const ubicacion = p?.direccionF;
                    //const moneda = p?.operacion[0]?.precios[0]?.moneda;
                    //const precio = p?.operacion[0]?.precios[0]?.precio;
                    //const operacion = p?.operacion[0]?.operacion;
                    const id = p?._id || p?.id;

                    return (
                        <article
                            key={id}
                            className={`pd-card pd-card--${cardVariant(i)}`}
                            /* style={{ "--delay": `${i * 70}ms` }} */
                            onClick={() => {
                                // Si ya tenés ruta de detalle, conectalo acá:
                                navigate(`/detalle/${id}`);
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="pd-media">
                                <img className="pd-img" src={p?.imagenes[0].original} alt={"not found"} loading="lazy" />
                                <div className="pd-shine" />
                            </div>

                            <div className="pd-info">
                                <h3 className="pd-card-title">{titulo}</h3>
                                {ubicacion ? <p className="pd-card-sub">{ubicacion}</p> : null}

                                <div className="pd-cta">
                                    <span className="pd-cta-text">Ver detalle</span>
                                    <span className="pd-cta-arrow">→</span>
                                </div>
                            </div>

                            <div className="pd-glow" />
                        </article>
                    );
                })}
            </div>

            <div
                className="btn-verTodas"
                onClick={() => navigate("/propiedades")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate("/propiedades")}
            >
                <span className="btn-circle" aria-hidden="true">
                    <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M13 7L18 12L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>

                <span className="btn-text">VER TODAS LAS PROPIEDADES</span>
            </div>


        </section>
    );
}


export default LandingProps;