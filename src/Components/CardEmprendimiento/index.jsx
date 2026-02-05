import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import IconoUbicacion from '../../Images/Iconos/iconoUbicacion.png';
import './styles.css';

function CardEmprendimiento({ id, imagenes, direccionF, locacion, tituloPublicacion, fechaEntrega, descripcion }) {
    const [showDetail, setShowDetail] = useState(false);
    const img = imagenes?.[0]?.imagen;

    return (
        <article className="emp-card">
            <NavLink
                to={`/detalleEmp/${id}`}
                className="emp-card-media"
                onMouseEnter={() => setShowDetail(true)}
                onMouseLeave={() => setShowDetail(false)}
            >
                <img src={img} alt={tituloPublicacion || "Emprendimiento"} className="emp-card-img" />

                <div className={`emp-card-overlay ${showDetail ? "is-visible" : ""}`}>
                    <span className="emp-card-cta">Ver detalle</span>
                </div>
            </NavLink>

            <div className="emp-card-body">
                <div className="emp-card-top">
                    <h3 className="emp-card-title">{tituloPublicacion}</h3>
                    {fechaEntrega ? (
                        <span className="emp-card-chip">Entrega: {fechaEntrega}</span>
                    ) : null}
                </div>

                <div className="emp-card-loc">
                    <div className="emp-card-address">
                        <img src={IconoUbicacion} alt="ubicación" />
                        <span>{direccionF}</span>
                    </div>
                    <p className="emp-card-city">{locacion}</p>
                </div>

                <p className="emp-card-desc">{descripcion}</p>

                <div className="emp-card-actions">
                    <NavLink to={`/detalleEmp/${id}`} className="emp-card-btn">
                        Ver emprendimiento
                    </NavLink>
                </div>
            </div>
        </article>
    );
}

export default CardEmprendimiento;
