import React, { useState } from 'react';
import NoHayProps from '../NoHayProps';
import Card from '../Card';
import './estilos.css';

const arrayFiltrosTipo = [
    'Depto', 'Casa', 'PH', 'Local',
    'Oficina', 'Cochera', 'Terreno', 'Galpón',
];

const arrayFiltrosOperacion = [
    'Venta', 'Alquiler'
];

function ListaFavoritos({ allProps }) {
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroOperacion, setFiltroOperacion] = useState('');

    // Filtrado con estructura real
    const propsFiltrados = allProps.filter(p => {
        const matchTipo = filtroTipo ? p.tipo.nombre === filtroTipo : true;
        const matchOperacion = filtroOperacion 
            ? p.operacion?.[0]?.operacion === filtroOperacion 
            : true;
        return matchTipo && matchOperacion;
    });

    return (
        <div className='cont-listaProps-fav'>
            <div className="cont-titulos">
                <div className="linea-destacadas "></div>
                <h2 className="titulo-props-destacadas">Tus propiedades favoritas</h2>
                <div className="linea-destacadas "></div>
            </div>

            {/* Filtros por tipo de propiedad */}
            <div className="cont-filtros-fav">
                <button
                    onClick={() => setFiltroTipo('')}
                    className={filtroTipo === '' ? 'activo' : ''}
                    data-translate
                >
                    Todas
                </button>
                {arrayFiltrosTipo.map((tipo) => (
                    <button
                        key={tipo}
                        onClick={() => setFiltroTipo(tipo)}
                        className={filtroTipo === tipo ? 'activo' : ''}
                        data-translate
                    >
                        {tipo}
                    </button>
                ))}
            </div>

            {/* Filtros por operación */}
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

            {/* Lista de propiedades */}
            <div className='cont-card-lista-props-fav'>
                {propsFiltrados.length ? (
                    propsFiltrados.map(p => (
                        <div className='cont-card-Fav-listaProps' key={p.id}>
                            <Card
                                id={p.id}
                                tituloPublicacion={p.tituloPublicacion}
                                ubicacion={p.ubicacion}
                                operacion={p.operacion}
                                moneda={p.operacion?.[0]?.precios?.[0]?.moneda}
                                precio={p.operacion?.[0]?.precios?.[0]?.precio}
                                imagenes={p.imagenes}
                                cantCocheras={p.cantCocheras}
                                ambientes={p.ambientes}
                                dormitorios={p.dormitorios}
                                tipoPropiedad={p.tipoPropiedad}
                                supTotal={p.supTotal}
                                supDescubierta={p.supDescubierta}
                                supCubierta={p.supCubierta}
                                supSemiCub={p.supSemiCub}
                                baños={p.baños}
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
    );
}

export default ListaFavoritos;
