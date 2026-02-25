import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProps } from "../../Redux/Actions";
import Loading from "../../Components/Loading";
import FiltersBar from "../../Components/FiltrosPropiedadesPage";
import ViewToggle from "../../Components/BotonesVistas";
import PropertiesMap from "../../Components/GoogleMapsB";
import { PAGINATION } from "../../Helps/paginacion";
import ListaPropiedades from "../../Components/ListaPropiedades"; // ✅ ESTE
import "./styles.css";
import Paginacion from "../../Components/Paginacion";

const parseCsvParam = (searchParams, key) => {
    const value = searchParams.get(key);
    if (!value) return [];
    return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
};

const getFiltersFromSearch = (search) => {
    const searchParams = new URLSearchParams(search);
    const operacion = searchParams.get("operacion") || "Todas";
    const tipoPropiedad = parseCsvParam(searchParams, "tipo");
    const barriosFromPlural = parseCsvParam(searchParams, "barrios");
    const barrios = barriosFromPlural.length ? barriosFromPlural : parseCsvParam(searchParams, "barrio");
    const ambientes = searchParams.get("ambientes") || "";
    const precioMin = searchParams.get("precioMin") || "";
    const precioMax = searchParams.get("precioMax") || "";
    const page = Number(searchParams.get("page")) || 1;

    return {
        operacion,
        tipoPropiedad,
        barrios,
        ambientes,
        precioMin,
        precioMax,
        page: page > 0 ? page : 1,
    };
};

function PropiedadesPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const filtersFromSearch = getFiltersFromSearch(location.search);

    const loading = useSelector((state) => state.loading);
    const allProps = useSelector((state) => state.propiedades) || [];
    const totalPropiedades = useSelector((state) => state.totPropiedades) || 0;

    // filtros
    const [operacion, setOperacion] = useState(filtersFromSearch.operacion);
    const [tipoPropiedad, setTipoPropiedad] = useState(filtersFromSearch.tipoPropiedad);
    const [barrios, setBarrios] = useState(filtersFromSearch.barrios);
    const [ambientes, setAmbientes] = useState(filtersFromSearch.ambientes);
    const [precioMin, setPrecioMin] = useState(filtersFromSearch.precioMin);
    const [precioMax, setPrecioMax] = useState(filtersFromSearch.precioMax);

    // vistas
    const [viewMode, setViewMode] = useState("split");
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 980);

    // paginación
    const propiedadesPorPagina = PAGINATION.PROPIEDADES;
    const [currentPage, setCurrentPage] = useState(filtersFromSearch.page);
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
    const effectiveViewMode = isMobile ? "list" : viewMode;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 980px)");
        const onChange = (e) => setIsMobile(e.matches);
        setIsMobile(media.matches);
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        dispatch(getProps(limit, offset, operacion, tipoPropiedad, barrios, precioMin, precioMax, ambientes));
    }, [dispatch, limit, offset, operacion, tipoPropiedad, barrios, ambientes, precioMin, precioMax]);

    useEffect(() => {
        const nextFilters = getFiltersFromSearch(location.search);
        setOperacion(nextFilters.operacion);
        setTipoPropiedad(nextFilters.tipoPropiedad);
        setBarrios(nextFilters.barrios);
        setAmbientes(nextFilters.ambientes);
        setPrecioMin(nextFilters.precioMin);
        setPrecioMax(nextFilters.precioMax);
        setCurrentPage(nextFilters.page);
    }, [location.search]);

    useEffect(() => {
        setSelectedId(null);
        setHoveredId(null);
    }, [location.key]);

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
                        {!isMobile && (
                            <div className="pp-topbar-right">
                                <ViewToggle value={viewMode} onChange={setViewMode} />
                            </div>
                        )}
                    </div>

                    {/* muestra total de props en número */}
                    <div className="pp-meta">
                        <div className="pp-count">
                            {totalPropiedades} Propiedades {operacion !== "Todas" ? `en ${operacion}` : ""}
                        </div>
                    </div>

                    <div className={`pp-layout pp-layout--${effectiveViewMode}`}>
                        {(effectiveViewMode === "split" || effectiveViewMode === "list") && (
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

                        {!isMobile && (effectiveViewMode === "split" || effectiveViewMode === "map") && (
                            <div className="pp-map">
                                <PropertiesMap
                                    key={`pp-map-${location.key}-${currentPage}-${allProps.length}`}
                                    items={allProps}
                                    selectedId={selectedId}
                                    onSelect={setSelectedId}
                                    hoveredId={hoveredId}
                                />
                            </div>
                        )}
                    </div>

                    <div className="pp-footer">
                        <Paginacion
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalPropiedades={totalPropiedades}
                            propiedadesPorPagina={totalPages}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PropiedadesPage;
