import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import CardChicaImagenGrande from '../CardChicaImgGrande';
import { fetchProperties } from '../../api/tokko';
import './styles.css';

const getPrecioPrincipal = (prop, operacionProp) => {
    const operaciones = Array.isArray(prop?.operacion) ? prop.operacion : [];
    const opPreferida = operaciones.find((op) => op?.operacion === operacionProp) || operaciones[0];
    return Number(opPreferida?.precios?.[0]?.precio);
};

const getSimilitud = ({ prop, precioProp, tipoProp, barrio, operacionProp }) => {
    const precio = getPrecioPrincipal(prop, operacionProp);
    const diff = Number.isFinite(precio) && Number.isFinite(Number(precioProp))
        ? Math.abs(precio - Number(precioProp))
        : Infinity;

    let score = 0;

    if (prop?.tipo?.nombre === tipoProp) score += 50;
    if (prop?.operacion?.some((op) => op?.operacion === operacionProp)) score += 28;
    if (barrio && prop?.ubicacion?.barrio === barrio) score += 22;

    if (diff <= 30000) score += 24;
    else if (diff <= 80000) score += 16;
    else if (diff <= 150000) score += 10;
    else if (diff !== Infinity) score += Math.max(0, 8 - Math.floor(diff / 100000));

    if (prop?.destacadaEnWeb) score += 4;

    return { score, diff };
};

function ListaPropsSimilares({ precioProp, tipoProp, barrio, operacionProp, vista, idProp, id }) {
    const propsRedux = useSelector(state => state.propiedades);
    const contenedorRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [propsBase, setPropsBase] = useState([]);

    const propiedadId = String(idProp || id || '');

    useEffect(() => {
        let isMounted = true;

        const cargarPropiedades = async () => {
            try {
                const resp = await fetchProperties({ limit: 200, offset: 0 });
                if (isMounted) setPropsBase(resp?.propiedades || []);
            } catch (error) {
                if (isMounted) setPropsBase(Array.isArray(propsRedux) ? propsRedux : []);
            }
        };

        cargarPropiedades();

        return () => {
            isMounted = false;
        };
    }, [propsRedux]);

    const propsFiltradas = useMemo(() => {
        const base = Array.isArray(propsBase) && propsBase.length
            ? propsBase
            : (Array.isArray(propsRedux) ? propsRedux : []);

        const candidates = base.filter((p) => String(p?.id) !== propiedadId);
        if (!candidates.length) return [];

        return candidates
            .map((prop) => ({
                prop,
                ...getSimilitud({ prop, precioProp, tipoProp, barrio, operacionProp }),
            }))
            .sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return a.diff - b.diff;
            })
            .slice(0, 8)
            .map((item) => item.prop);
    }, [propsBase, propsRedux, propiedadId, precioProp, tipoProp, barrio, operacionProp]);

    const scroll = (offset) => {
        contenedorRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
    };

    const handleScroll = () => {
        const container = contenedorRef.current;
        if (!container) return;

        const scrollLeft = container.scrollLeft;
        const cardWidth = container.offsetWidth;
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
            {propsFiltradas.length > 0 ? (
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
                    <h2>No hay propiedades disponibles para recomendar.</h2>
                </div>
            )}
        </div>
    );
}

export default ListaPropsSimilares;
