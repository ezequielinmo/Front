import React, { useMemo } from "react";
//import PropertyCardRow from "../../Components/CardRow";
import Card from "../Card"; // <-- ajustá la ruta real a donde está tu Card
import "./styles.css";

export default function PropertiesList({
    items = [],
    viewMode = "split",
    selectedId,
    onSelect,
    operacionFiltro = "Todas",
}) {
    // vista que espera tu Card: "Venta" | "Alquiler" | "ambas"
    const vista = useMemo(() => {
        if (operacionFiltro === "Venta") return "Venta";
        if (operacionFiltro === "Alquiler") return "Alquiler";
        return "ambas";
    }, [operacionFiltro]);

    const safeItems = Array.isArray(items) ? items : [];

    return (
        <div className={`pp-listwrap pp-listwrap--${viewMode}`}>
            {safeItems.length === 0 ? (
                <div className="pp-empty">
                    <p>No hay propiedades para mostrar con estos filtros.</p>
                </div>
            ) : (
                <div className={`pp-cards pp-cards--${viewMode}`}>
                    {safeItems.map((p) => {
                        const id = p?.id ?? p?._id;

                        // Fallback de imágenes para que tu Card no rompa con imagenes.length
                        const imagenesOk =
                            Array.isArray(p?.imagenes) && p.imagenes.length > 0
                                ? p.imagenes
                                : [{ original: "https://via.placeholder.com/800x600?text=Sin+imagen" }];

                        return (
                            <div
                                key={id}
                                className={`pp-carditem ${selectedId === id ? "is-selected" : ""}`}
                                onMouseEnter={() => onSelect?.(id)}
                                onClick={() => onSelect?.(id)}
                            >
                                <Card
                                    id={id}
                                    direccionF={p?.direccionF}
                                    cantCocheras={p?.cantCocheras}
                                    operacion={p?.operacion || []}
                                    imagenes={imagenesOk}
                                    tituloPublicacion={p?.tituloPublicacion}
                                    ambientes={p?.ambientes}
                                    dormitorios={p?.dormitorios}
                                    supTotal={p?.supTotal}
                                    supCubierta={p?.supCubierta}
                                    supDescubierta={p?.supDescubierta}
                                    unidadMedida={p?.unidadMedida}
                                    tipo={p?.tipo}
                                    destacadaEnWeb={p?.destacadaEnWeb}
                                    vista={vista}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/* export default function PropertiesList({ items, viewMode, selectedId, onSelect }) {
    if (!items?.length) return <div className="pl-empty">No hay resultados.</div>;

    return (
        <div className={`pl-wrap ${viewMode === "split" ? "pl-wrap--split" : "pl-wrap--list"}`}>
            {items.map((p) => {
                const id = p?.id ?? p?._id;
                return (
                    <PropertyCardRow
                        key={id}
                        p={p}
                        active={String(id) === String(selectedId)}
                        onHover={() => onSelect(id)}   // ✅ hover -> centra mapa
                    />
                );
            })}
        </div>
    );
} */
