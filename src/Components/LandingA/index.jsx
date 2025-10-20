import React, { useEffect, useState } from 'react'
import FiltrosSelect from '../../Components/FiltrosSelect';
import Video from '../../Images/videoLand.mp4'
import './styles.css'
import Flecha from '../FlechaAbajo';

function LandigA({
    setCurrentPage,
    setOperacion,
    setTipoPropiedad,
    setBarrios,
    setAmbientes,
    setPrecioMin,
    setPrecioMax
}) {
    const [showFiltros, setShowFiltros] = useState(false);

    /* efecto para la animación */
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFiltros(true);
        }, 3000); // 3 segundos
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='cont-landing-A'>
            <video className='cont-video' autoPlay muted loop>
                <source src={Video} type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
            </video>

            {/* Filtros */}
            <div className={`cont-filtros-landing ${showFiltros ? 'show' : ''}`}>
                <FiltrosSelect
                    verTipoOperacion={true}
                    setCurrentPage={setCurrentPage}
                    setOperacion={setOperacion}
                    setTipoPropiedad={setTipoPropiedad}
                    setBarrios={setBarrios}
                    setAmbientes={setAmbientes}
                    setPrecioMin={setPrecioMin}
                    setPrecioMax={setPrecioMax}
                    scrollToLista={() => {
                        const lista = document.getElementById("listaProps");
                        if (lista) lista.scrollIntoView({ behavior: "smooth" });
                    }}
                />
            </div>

            {/* flecha */}
            <div className='cont-flecha-home'>
                <Flecha/>
            </div>
        </div>
    )
}

export default LandigA;
