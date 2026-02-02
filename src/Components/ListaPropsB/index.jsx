import React from "react";
import PropertyCardRow from "../../Components/CardRow";
import "./styles.css";

export default function PropertiesList({ items, viewMode, selectedId, onSelect }) {
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
}
