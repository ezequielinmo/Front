import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProps } from "../../Redux/Actions";
import Loading from "../../Components/Loading";

import FiltersBar from "../../Components/FiltrosPropiedadesPage";
import ViewToggle from "../../Components/BotonesVistas";
import PropertiesList from "../../Components/ListaPropsB";
import PropertiesMap from "../../Components/GoogleMapsB";
import Pagination from "../../Components/PaginacionB";

import "./styles.css";

function PropiedadesPage() {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.loading);
    const allProps = useSelector((state) => state.propiedades) || [];
    const totalPropiedades = useSelector((state) => state.totPropiedades) || 0;

    // --- filtros (tu misma estructura)
    const [operacion, setOperacion] = useState("Todas");
    const [tipoPropiedad, setTipoPropiedad] = useState([]); // array
    const [barrios, setBarrios] = useState([]); // array
    const [ambientes, setAmbientes] = useState(""); // string/number
    const [precioMin, setPrecioMin] = useState("");
    const [precioMax, setPrecioMax] = useState("");

    // --- vistas
    const [viewMode, setViewMode] = useState("split"); // "split" | "map" | "list"

    // --- paginación
    const [currentPage, setCurrentPage] = useState(1);
    const propiedadesPorPagina = 12;
    const limit = propiedadesPorPagina;
    const offset = (currentPage - 1) * limit;

    // --- selección sincronizada lista <-> mapa
    const [selectedId, setSelectedId] = useState(null);

    // total pages
    const totalPages = useMemo(() => {
        const pages = Math.ceil(totalPropiedades / propiedadesPorPagina);
        return pages > 0 ? pages : 1;
    }, [totalPropiedades]);

    // scroll top al montar
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // fetch props (tu action)
    useEffect(() => {
        dispatch(getProps(limit, offset, operacion, tipoPropiedad, barrios, precioMin, precioMax, ambientes));
    }, [dispatch, limit, offset, operacion, tipoPropiedad, barrios, ambientes, precioMin, precioMax]);

    // scroll top cuando cambia página
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    // cuando cambian filtros, vuelvo a página 1
    useEffect(() => {
        setCurrentPage(1);
    }, [operacion, tipoPropiedad, barrios, ambientes, precioMin, precioMax]);

    // ✅ “ver resultados en esta zona” del mapa: en tu arquitectura ideal sería un filtro extra (bounds)
    // lo dejamos preparado (si querés, lo conectamos a tu back en el siguiente paso)
    //const [mapBounds, setMapBounds] = useState(null);

    // si activás bounds como filtro real, agregalo a tu getProps y a este deps array
    // useEffect(() => { ... }, [mapBounds])

    return (
        <div className="pp-page">
            {loading ? (
                <Loading />
            ) : (
                <div className="pp-shell">
                    {/* TOPBAR: filtros + ordenar + vistas */}
                    <div className="pp-topbar">
                        <FiltersBar
                            value={{
                                operacion,
                                tipoPropiedad,
                                barrios,
                                ambientes,
                                precioMin,
                                precioMax,
                            }}
                            onChange={(next) => {
                                setOperacion(next.operacion);
                                setTipoPropiedad(next.tipoPropiedad);
                                setBarrios(next.barrios);
                                setAmbientes(next.ambientes);
                                setPrecioMin(next.precioMin);
                                setPrecioMax(next.precioMax);
                            }}
                            onClear={() => {
                                setOperacion("Todas");
                                setTipoPropiedad([]);
                                setBarrios([]);
                                setAmbientes("");
                                setPrecioMin("");
                                setPrecioMax("");
                            }}
                        />

                        <div className="pp-topbar-right">
                            <ViewToggle value={viewMode} onChange={setViewMode} />
                        </div>
                    </div>

                    {/* META */}
                    <div className="pp-meta">
                        <div className="pp-count">
                            {totalPropiedades} Propiedades {operacion !== "Todas" ? `en ${operacion}` : ""}
                        </div>
                    </div>

                    {/* LAYOUT (split / list / map) */}
                    <div className={`pp-layout pp-layout--${viewMode}`}>
                        {(viewMode === "split" || viewMode === "list") && (
                            <div className="pp-list">
                                <PropertiesList
                                    items={allProps}
                                    viewMode={viewMode}
                                    selectedId={selectedId}
                                    onSelect={setSelectedId}
                                />
                            </div>
                        )}

                        {(viewMode === "split" || viewMode === "map") && (
                            <div className="pp-map">
                                <PropertiesMap
                                    items={allProps}              // ✅ la página actual (12)
                                    selectedId={selectedId}
                                    onSelect={setSelectedId}
                                    /* onBoundsChange={setMapBounds} */ // ✅ botón "ver resultados en esta zona"
                                />
                            </div>
                        )}
                    </div>

                    {/* PAGINACION */}
                    <div className="pp-footer">
                        <Pagination
                            page={currentPage}
                            totalPages={totalPages}
                            onChange={setCurrentPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PropiedadesPage;
