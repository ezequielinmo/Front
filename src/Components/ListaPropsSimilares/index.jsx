import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CardChicaImagenGrande from '../CardChicaImgGrande';
import './styles.css';

function ListaPropsSimilares({ precioProp, tipoProp, vista, id }) {
    const allProps = useSelector(state => state.propiedades);
    const contenedorRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const propsFiltraPrecio = allProps?.filter(p => {
        const precio = Number(p.operacion[0]?.precios[0]?.precio);
        return !isNaN(precio) && precio >= precioProp - 30000 && precio <= precioProp + 80000 && precio !== precioProp;
    });

    const propsFiltradas = propsFiltraPrecio.filter(p => p.tipo.nombre === tipoProp);

    const scroll = (offset) => {
        contenedorRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    };

    const handleScroll = () => {
        const scrollLeft = contenedorRef.current.scrollLeft;
        const cardWidth = contenedorRef.current.offsetWidth;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(index);
    };

    useEffect(() => {
        if (!propsFiltradas.length) return;

        const container = contenedorRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [propsFiltradas]);


    return (
        <div className="wrapper-similares">
            {propsFiltradas && propsFiltradas.length > 0 ? (
                <>
                    <button className="flecha izquierda" onClick={() => scroll(-300)}>◀</button>

                    <div className="contListaPsimilares" ref={contenedorRef}>
                        {propsFiltradas.map(p => (
                            <div className="cont-cardChicaImagenGrande" key={p.id}>
                                <CardChicaImagenGrande {...p} vista={vista} />
                            </div>
                        ))}
                    </div>

                    <button className="flecha derecha" onClick={() => scroll(300)}>▶</button>

                    {/* LOS PUNTOS DEBAJO */}
                    <div className="dots-wrapper">
                        {propsFiltradas.map((_, i) => (
                            <span
                                key={i}
                                className={`dot ${i === activeIndex ? 'active' : ''}`}
                            ></span>
                        ))}
                    </div>
                </>
            ) : (
                <div className="no-props-similares">
                    <h2>No hay propiedades similares para recomendarte</h2>
                </div>
            )}
        </div>

    );
}

export default ListaPropsSimilares;
