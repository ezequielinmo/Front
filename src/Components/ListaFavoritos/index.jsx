import React, { useState, useMemo } from 'react';
import NoHayProps from '../NoHayProps';
import Card from '../Card';
import './estilos.css';

const arrayFiltrosOperacion = ['Venta', 'Alquiler'];

function ListaFavoritos({ allProps = [] }) {
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroOperacion, setFiltroOperacion] = useState('');
    const totalFavoritos = Array.isArray(allProps) ? allProps.length : 0;

    const tiposDisponibles = useMemo(() => {
        if (!Array.isArray(allProps)) return [];
        const tipos = new Set(allProps.map((p) => p.tipo?.nombre).filter(Boolean));
        return Array.from(tipos);
    }, [allProps]);

    const propsFiltrados = useMemo(() => {
        if (!Array.isArray(allProps)) return [];
        return allProps.filter((p) => {
            const matchTipo = filtroTipo ? p.tipo?.nombre === filtroTipo : true;
            const matchOperacion = filtroOperacion
                ? p.operacion?.some((op) => op.operacion === filtroOperacion)
                : true;
            return matchTipo && matchOperacion;
        });
    }, [allProps, filtroTipo, filtroOperacion]);

    const hayFiltrosActivos = Boolean(filtroTipo || filtroOperacion);

    const limpiarFiltros = () => {
        setFiltroTipo('');
        setFiltroOperacion('');
    };

    return (
        <div className='cont-listaProps-fav'>
            <div className="cont-titulos">
                <h1 className="titulo-props-destacadas">Tus propiedades favoritas</h1>
                <p className="subtitulo-props-fav">
                    Guarda, filtra y compara tus propiedades en un solo lugar.
                </p>
                <div className="meta-favoritos">
                    <span className="badge-fav">Total: {totalFavoritos}</span>
                    <span className="badge-fav">Resultados: {propsFiltrados.length}</span>
                </div>
            </div>

            <div className="layout-favoritos">
                <aside className="barra-filtros-fav">
                    <div className="cabecera-filtros">
                        <h3>Filtros</h3>
                        <p>Refina tus favoritos segun lo que buscas.</p>
                        {hayFiltrosActivos && (
                            <button onClick={limpiarFiltros} className="btn-reset-filtros">
                                Limpiar filtros
                            </button>
                        )}
                    </div>

                    <div className="bloque-filtro">
                        <h4>Operacion</h4>
                        <button
                            onClick={() => setFiltroOperacion('')}
                            className={`filter-btn ${filtroOperacion === '' ? 'activo' : ''}`}
                        >
                            Ambas
                        </button>
                        {arrayFiltrosOperacion.map((op) => (
                            <button
                                key={op}
                                onClick={() => setFiltroOperacion(op)}
                                className={`filter-btn ${filtroOperacion === op ? 'activo' : ''}`}
                            >
                                {op}
                            </button>
                        ))}
                    </div>

                    <div className="bloque-filtro">
                        <h4>Tipo de propiedad</h4>
                        <button
                            onClick={() => setFiltroTipo('')}
                            className={`filter-btn ${filtroTipo === '' ? 'activo' : ''}`}
                        >
                            Todas
                        </button>
                        {tiposDisponibles.map((tipo) => (
                            <button
                                key={tipo}
                                onClick={() => setFiltroTipo(tipo)}
                                className={`filter-btn ${filtroTipo === tipo ? 'activo' : ''}`}
                            >
                                {tipo}
                            </button>
                        ))}
                    </div>
                </aside>

                <div className="filtros-superiores">
                    <div className="cabecera-filtros cabecera-filtros-mobile">
                        <h3>Filtros rapidos</h3>
                        {hayFiltrosActivos && (
                            <button onClick={limpiarFiltros} className="btn-reset-filtros">
                                Limpiar
                            </button>
                        )}
                    </div>

                    <div className="cont-filtros-fav">
                        <button
                            onClick={() => setFiltroTipo('')}
                            className={filtroTipo === '' ? 'activo' : ''}
                        >
                            Todas
                        </button>
                        {tiposDisponibles.map((tipo) => (
                            <button
                                key={tipo}
                                onClick={() => setFiltroTipo(tipo)}
                                className={filtroTipo === tipo ? 'activo' : ''}
                            >
                                {tipo}
                            </button>
                        ))}
                    </div>

                    <div className="cont-filtros-fav">
                        <button
                            onClick={() => setFiltroOperacion('')}
                            className={filtroOperacion === '' ? 'activo' : ''}
                        >
                            Ambas
                        </button>
                        {arrayFiltrosOperacion.map((op) => (
                            <button
                                key={op}
                                onClick={() => setFiltroOperacion(op)}
                                className={filtroOperacion === op ? 'activo' : ''}
                            >
                                {op}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='cont-card-lista-props-fav'>
                    {propsFiltrados.length ? (
                        propsFiltrados.map((p) => (
                            <div className='cont-card-Fav-listaProps' key={p.id}>
                                <Card
                                    id={p.id}
                                    direccionF={p.direccionF}
                                    operacion={p.operacion}
                                    imagenes={p.imagenes}
                                    tituloPublicacion={p.tituloPublicacion}
                                    ambientes={p.ambientes}
                                    dormitorios={p.dormitorios}
                                    unidadMedida={p.unidadMedida}
                                    cantCocheras={p.cantCocheras}
                                    supTotal={p.supTotal}
                                    tipo={p.tipo}
                                    destacadaEnWeb={p.destacadaEnWeb}
                                    vista={'ambas'}
                                />
                            </div>
                        ))
                    ) : (
                        <div className='no-props no-props-fav'>
                            <NoHayProps />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListaFavoritos;
