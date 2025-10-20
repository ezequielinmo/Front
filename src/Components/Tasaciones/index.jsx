import React, {useEffect} from 'react';
import Flecha from '../FlechaAbajo';
import "./styles.css";

function Tasaciones() {

    //efecto para iniciar la Pag desd la parte SUPERIOR
    useEffect(() => {
        // Desplaza la página hacia la parte superior cuando el componente se monta
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='cont-gral-tasaciones'>
            <div className='cont-titulos-tasaciones'>
                <div className='cont-titulo-1-tasaciones'>
                    <h4 className='titulo-tasaciones'>TASACIONES</h4>
                </div>

                <div className='cont-titulo-2-tasaciones'>
                    <h1 className='titulo-2-tasaciones'>¿Necesitas saber cuál es el valor de tu propiedad?</h1>
                    <h2 className='titulo-3-tasaciones'>Nosotros te ayudamos</h2>
                </div>
            </div>

            <div className='cont-pasos-tasacion'>
                <div className="item-tasacion">
                    <h3>¿Cómo tasamos?</h3>
                    <p className="texto-tasacion">
                        Iniciamos el proceso con un análisis integral de la propiedad, considerando su ubicación, estado de conservación, antigüedad y características constructivas.
                    </p>
                    <Flecha />
                </div>

                <div className="item-tasacion">
                    <h3>Explicamos el mercado</h3>
                    <p className="texto-tasacion">
                        Brindamos un panorama actualizado sobre la situación del mercado inmobiliario, identificando la demanda real y el comportamiento de los valores en el área.
                    </p>
                    <Flecha />
                </div>

                <div className="item-tasacion">
                    <h3>Comparables por la zona</h3>
                    <p className="texto-tasacion">
                        Analizamos propiedades similares disponibles actualmente en la zona, lo que nos permite establecer un rango competitivo de precios de oferta.
                    </p>
                    <Flecha />
                </div>

                <div className="item-tasacion">
                    <h3>Comparables vendidos</h3>
                    <p className="texto-tasacion">
                        Contrastamos con operaciones ya concretadas en el último tiempo, obteniendo un valor real de cierre que refleja lo que los compradores efectivamente pagan.
                    </p>
                    <Flecha />
                </div>

                <div className="item-tasacion">
                    <h3>Visita personal</h3>
                    <p className="texto-tasacion">
                        Realizamos una visita presencial para corroborar detalles constructivos, terminaciones y particularidades únicas que impactan en la tasación final.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Tasaciones;
