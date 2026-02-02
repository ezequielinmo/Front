import React, {useEffect} from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import "./styles.css";

function Tasaciones() {

    //efecto para iniciar la Pag desd la parte SUPERIOR
    useEffect(() => {
        // Desplaza la página hacia la parte superior cuando el componente se monta
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="tasaciones-hero">
            {/* HERO */}
            <div className="hero-overlay">
                <h1>
                    Tasaciones <span>Profesionales</span>
                </h1>

                <p>
                    Conocé el valor real de tu propiedad con nuestro equipo de expertos.
                    Tasaciones precisas basadas en el mercado actual de Mar del Plata.
                </p>
            </div>

            {/* CARDS */}
            <div className="tasaciones-cards">

                <div className="tasacion-card">
                    <div className="icon-box">
                        <TrendingUpIcon />
                    </div>
                    <h4>Valor de mercado real</h4>
                    <p>
                        Análisis basado en transacciones recientes y tendencias del mercado local
                    </p>
                </div>

                <div className="tasacion-card">
                    <div className="icon-box">
                        <AccessTimeIcon />
                    </div>
                    <h4>Respuesta en 48hs</h4>
                    <p>
                        Recibí tu tasación profesional en máximo 2 días hábiles
                    </p>
                </div>

                <div className="tasacion-card">
                    <div className="icon-box">
                        <VerifiedUserIcon />
                    </div>
                    <h4>Sin compromiso</h4>
                    <p>
                        Tasación gratuita y sin ningún tipo de obligación de tu parte
                    </p>
                </div>

                <div className="tasacion-card">
                    <div className="icon-box">
                        <EmojiEventsIcon />
                    </div>
                    <h4>Expertos certificados</h4>
                    <p>
                        Tasadores con más de 15 años de experiencia en el mercado
                    </p>
                </div>

            </div>

        </section>
    );
}


export default Tasaciones;
