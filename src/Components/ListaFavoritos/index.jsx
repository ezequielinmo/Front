import React, { useState, useMemo } from 'react';
import NoHayProps from '../NoHayProps';
import Card from '../Card';
import './estilos.css';

const arrayFiltrosOperacion = ['Venta', 'Alquiler'];

function ListaFavoritos({ allProps = [] }) {
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroOperacion, setFiltroOperacion] = useState('');

    // 🔹 Obtener solo los tipos que existen en las favoritas
    const tiposDisponibles = useMemo(() => {
        if (!Array.isArray(allProps)) return [];
        const tipos = new Set(allProps.map(p => p.tipo?.nombre).filter(Boolean));
        return Array.from(tipos);
    }, [allProps]);

    // 🔹 Filtrar propiedades
    const propsFiltrados = useMemo(() => {
        if (!Array.isArray(allProps)) return [];
        return allProps.filter(p => {
            const matchTipo = filtroTipo ? p.tipo?.nombre === filtroTipo : true;
            const matchOperacion = filtroOperacion
                ? p.operacion?.some(op => op.operacion === filtroOperacion)
                : true;
            return matchTipo && matchOperacion;
        });
    }, [allProps, filtroTipo, filtroOperacion]);

    return (
        <div className='cont-listaProps-fav'>
            <div className="cont-titulos">
                <div className="linea-destacadas"></div>
                <h2 className="titulo-props-destacadas">Tus propiedades favoritas</h2>
                <div className="linea-destacadas"></div>
            </div>

            <div className="layout-favoritos">
                {/* Barra lateral solo visible en pantallas grandes */}
                <aside className="barra-filtros-fav">
                    <div className="bloque-filtro">
                        <h3>Operación</h3>
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

                    <div className="bloque-filtro">
                        <h3>Tipo de propiedad</h3>
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
                </aside>

                {/* Filtros superiores solo en móviles */}
                <div className="filtros-superiores">
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

                {/* Lista de propiedades */}
                <div className='cont-card-lista-props-fav'>
                    {propsFiltrados.length ? (
                        propsFiltrados.map(p => (
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
                                    vista={"ambas"}
                                />
                            </div>
                        ))
                    ) : (
                        <div className='no-props'>
                            <NoHayProps />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListaFavoritos;
