import React from "react";
import { ezequiel } from "../../Helps/ArrayEquipo";
import Video from "../../Images/videoLand.mp4";
import ListaEquipo from "../ListaEquipo";
import CardPersona from "../CardPersona";
import "./styles.css";

function LaEmpresa() {
    const eze = ezequiel;

    return (
        <section className="laemp">
            {/* HERO */}
            <header className="laemp__hero">
                <video className="laemp__video" autoPlay muted loop playsInline>
                    <source src={Video} type="video/mp4" />
                    Tu navegador no soporta la etiqueta de video.
                </video>

                {/* overlays (degradado + textura suave) */}
                <div className="laemp__overlay" aria-hidden="true" />
                <div className="laemp__grain" aria-hidden="true" />

                <div className="laemp__heroContent">
                    <p className="laemp__eyebrow">Estudio inmobiliario</p>

                    <h1 className="laemp__title">Ezequiel Jose Estudio Inmobiliario</h1>

                    <p className="laemp__subtitle">
                        Hacemos foco en lo que el cliente nos pide.
                    </p>

                    <p className="laemp__desc">
                        Acompañamos cada operación con cercanía, estrategia y claridad para que
                        tomes decisiones seguras.
                    </p>

                    {/* chips decorativos */}
                    <div className="laemp__chips">
                        <span className="laemp__chip">Transparencia</span>
                        <span className="laemp__chip">Gestión integral</span>
                        <span className="laemp__chip">Asesoramiento</span>
                    </div>
                </div>
            </header>

            {/* CONTENIDO */}
            <main className="laemp__container">
                {/* título sección */}
                <div className="laemp__sectionTitle">
                    <div className="laemp__line" />
                    <h2 className="laemp__h2">Nuestro Staff</h2>
                    <div className="laemp__line" />
                </div>

                {/* destacado */}
                <section className="laemp__featured">
                    <div className="laemp__featuredCard">
                        <CardPersona {...eze} />
                    </div>
                </section>

                {/* equipo */}
                <section className="laemp__team">
                    <ListaEquipo />
                </section>
            </main>
        </section>
    );
}

export default LaEmpresa;
