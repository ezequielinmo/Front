import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProps } from "../../Redux/Actions";
import Loading from "../../Components/Loading";
import FiltersBar from "../../Components/FiltrosPropiedadesPage";
import ViewToggle from "../../Components/BotonesVistas";
import PropertiesMap from "../../Components/GoogleMapsB";
import Pagination from "../../Components/PaginacionB";
import { PAGINATION } from "../../Helps/paginacion";
import ListaPropiedades from "../../Components/ListaPropiedades"; // ✅ ESTE
import "./styles.css";

function PropiedadesPage() {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.loading);
    const allProps = useSelector((state) => state.propiedades) || [];
    const totalPropiedades = useSelector((state) => state.totPropiedades) || 0;

    // filtros
    const [operacion, setOperacion] = useState("Todas");
    const [tipoPropiedad, setTipoPropiedad] = useState([]);
    const [barrios, setBarrios] = useState([]);
    const [ambientes, setAmbientes] = useState("");
    const [precioMin, setPrecioMin] = useState("");
    const [precioMax, setPrecioMax] = useState("");

    // vistas
    const [viewMode, setViewMode] = useState("split");

    // paginación
    const propiedadesPorPagina = PAGINATION.PROPIEDADES;
    const [currentPage, setCurrentPage] = useState(1);
    const limit = propiedadesPorPagina;
    const offset = (currentPage - 1) * limit;

    // selección lista <-> mapa
    const [selectedId, setSelectedId] = useState(null);
    //para mostrar el pin al pasar mouse sobre card
    const [hoveredId, setHoveredId] = useState(null);

    // ✅ vista para Card (precio)
    const vistaCards = useMemo(() => {
        if (operacion === "Venta") return "Venta";
        if (operacion === "Alquiler") return "Alquiler";
        return "ambas"; // Todas
    }, [operacion]);

    const totalPages = useMemo(() => {
        const pages = Math.ceil(totalPropiedades / propiedadesPorPagina);
        return pages > 0 ? pages : 1;
    }, [totalPropiedades, propiedadesPorPagina]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getProps(limit, offset, operacion, tipoPropiedad, barrios, precioMin, precioMax, ambientes));
    }, [dispatch, limit, offset, operacion, tipoPropiedad, barrios, ambientes, precioMin, precioMax]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [operacion, tipoPropiedad, barrios, ambientes, precioMin, precioMax]);

    return (
        <div className="pp-page">
            {loading ? (
                <Loading />
            ) : (
                <div className="pp-shell">
                    <div className="pp-topbar">
                        <FiltersBar
                            value={{ operacion, tipoPropiedad, barrios, ambientes, precioMin, precioMax }}
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
                        {/* Btn Vistas */}
                        <div className="pp-topbar-right">
                            <ViewToggle value={viewMode} onChange={setViewMode} />
                        </div>
                    </div>

                    {/* muestra total de props en número */}
                    <div className="pp-meta">
                        <div className="pp-count">
                            {totalPropiedades} Propiedades {operacion !== "Todas" ? `en ${operacion}` : ""}
                        </div>
                    </div>

                    <div className={`pp-layout pp-layout--${viewMode}`}>
                        {(viewMode === "split" || viewMode === "list") && (
                            <div className="pp-list">
                                <ListaPropiedades
                                    variant="page"
                                    showPagination={false} // porque ya tenés Pagination B
                                    allProps={allProps}
                                    vista={vistaCards}
                                    propiedadesPorPagina={12}
                                    hoveredId={hoveredId}
                                    setHoveredId={setHoveredId}
                                />
                            </div>
                        )}

                        {(viewMode === "split" || viewMode === "map") && (
                            <div className="pp-map">
                                <PropertiesMap
                                    items={allProps}
                                    selectedId={selectedId}
                                    onSelect={setSelectedId}
                                    hoveredId={hoveredId}
                                />
                            </div>
                        )}
                    </div>

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
