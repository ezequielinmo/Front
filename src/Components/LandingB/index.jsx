import React from "react";
import Tasacion from '../../Images/imgLandingB.jpeg';
import "./styles.css";
import { NavLink } from "react-router-dom";

const LandingB = () => {
    return (
        <section className="tasacion-hero">
            <div className="tasacion-texto">
                <span className="tasacion-pretitle">
                    CONOCÉ EL VALOR DE TU PROPIEDAD
                </span>

                <h1>
                    Ahora podés tasar tu propiedad de forma rápida y segura.
                    <br />
                    Completá los datos así podemos brindarte un valor aproximado.
                    <br />
                    <strong>¿Calculamos?</strong>
                </h1>

                <NavLink to='/tasaciones'>
                    <button className="tasacion-btn">
                        SOLICITAR TASACIÓN
                    </button>
                </NavLink>
            </div>

            <div className="tasacion-imagen">
                <img
                    src={Tasacion}
                    alt="Tasación inmobiliaria"
                />
            </div>
        </section>
    );
};

export default LandingB;
