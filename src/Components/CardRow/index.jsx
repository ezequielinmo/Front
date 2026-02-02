import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function PropertyCardRow({ p, active, onHover }) {
    const navigate = useNavigate();
    const id = p?.id;

    const img = p?.imagenes?.find(i => i.esPortada)?.original || p?.imagenes?.[0]?.original;
    //const operacion = p?.operacion?.[0]?.operacion || "";
    const moneda = p?.operacion?.[0]?.precios?.[0]?.moneda || "USD";
    const precioNum = p?.operacion?.[0]?.precios?.[0]?.precio;

    const titulo = p?.tituloPublicacion || "";
    const ubic = p?.ubicacion?.barrio
        ? `${p?.ubicacion?.barrio} · ${p?.ubicacion?.ubicacion || ""}`
        : (p?.ubicacion?.ubicacion || p?.direccionF || "");

    //const tipo = p?.tipo?.nombre || "";

    return (
        <article
            className={`pc-row ${active ? "is-active" : ""}`}
            onMouseEnter={onHover}
            onClick={() => navigate(`/detalle/${id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/detalle/${id}`)}
        >
            <div className="pc-imgWrap">
                <img className="pc-img" src={img} alt={titulo} />
                {/* {operacion ? <span className="pc-tag">{operacion.toUpperCase()}</span> : null} */}                
            </div>

            <div className="pc-body">
                <h3 className="pc-title">{titulo}</h3>
                <p className="pc-sub">{ubic}</p>

                <div className="pc-price">{formatPrecio(precioNum, moneda)}</div>

                <div className="pc-mini">
                    {p?.ambientes ? <span>{p.ambientes} Amb</span> : null}
                    {p?.dormitorios ? <span>{p.dormitorios} Dorm</span> : null}
                    {p?.supTotal ? <span>{p.supTotal} {p?.unidadMedida || "m²"}</span> : null}
                </div>
            </div>
        </article>
    );
}

function formatPrecio(precio, moneda) {
    if (precio === null || precio === undefined || precio === "") return "";
    const currency = moneda === "USD" ? "USD" : "ARS";
    if (typeof precio === "number") {
        return precio.toLocaleString("es-AR", { style: "currency", currency, maximumFractionDigits: 0 });
    }
    return `${moneda || ""} ${precio}`.trim();
}
