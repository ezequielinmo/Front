import React, { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";

const tipoProp = [
    "Departamento", "Casa", "PH", "Local",
    "Oficina", "Cochera", "Terreno", "Galpón",
];

const ambientesOpts = ["1", "2", "3", "4", "mas"];

const barriosOpts = [
    "Arenas Chico", "Arenas del Sur", "Aureal Park", "Barracas de San Benito",
    "Casonas del Harás", "Cenderos de Rumenco", "Centro", "Chapadmalal",
    "Chauvin", "Costa del Sol", "Developer Aqua", "Developer Park", "Don Bosco",
    "El Gaucho", "El Marquesado", "Guemes", "Harás del Mar", "La Armonía",
    "La Cercania", "La Florida", "La Perla", "Las Margaritas", "Las Prunas",
    "Lomas De Stella Maris", "Los Troncos", "Macrocentro", "Marayui",
    "Olas Chapadmalal", "Piñares de Santa Clara", "Playa Chica", "Playa Grande",
    "Plaza España", "Plaza Mitre", "Rumenco", "Rumenco joven", "San Carlos",
    "Santa Cecilia", "Sierra De Los Padres", "Stella Maris", "Terminal Vieja",
    "Villa Primera", "Varese"
];

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (e) => {
            if (!ref.current || ref.current.contains(e.target)) return;
            handler(e);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

function uniq(arr) {
    return Array.from(new Set(arr));
}

export default function FiltersBar({ value, onChange, onClear }) {
    const set = (patch) => onChange({ ...value, ...patch });

    const [openKey, setOpenKey] = useState(null); // "operacion" | "tipo" | "barrio" | "amb" | "precio" | null
    const wrapRef = useRef(null);

    useOnClickOutside(wrapRef, () => setOpenKey(null));

    // --- helpers: add/remove en arrays
    const toggleInArray = (arr = [], item) => {
        const has = arr.includes(item);
        return has ? arr.filter((x) => x !== item) : [...arr, item];
    };

    const removeChip = (key, item) => {
        if (key === "tipoPropiedad") set({ tipoPropiedad: (value.tipoPropiedad || []).filter((x) => x !== item) });
        if (key === "barrios") set({ barrios: (value.barrios || []).filter((x) => x !== item) });
        if (key === "operacion") set({ operacion: "Todas" });
        if (key === "ambientes") set({ ambientes: "" });
    };

    // texto del botón (resumen)
    const labelOperacion = useMemo(() => {
        return value.operacion && value.operacion !== "Todas" ? value.operacion : "Tipo de operación";
    }, [value.operacion]);

    const labelTipo = useMemo(() => {
        const n = (value.tipoPropiedad || []).length;
        return n ? `Tipo (${n})` : "Tipo de propiedad";
    }, [value.tipoPropiedad]);

    const labelBarrio = useMemo(() => {
        const n = (value.barrios || []).length;
        return n ? `Ubicación (${n})` : "Ubicación";
    }, [value.barrios]);

    const labelAmb = useMemo(() => {
        return value.ambientes ? `Amb | Dorm: ${value.ambientes}` : "Amb | Dorm";
    }, [value.ambientes]);

    const labelPrecio = useMemo(() => {
        const min = value.precioMin;
        const max = value.precioMax;
        if (!min && !max) return "Precio";
        if (min && max) return `Precio: ${min} - ${max}`;
        if (min) return `Precio: desde ${min}`;
        return `Precio: hasta ${max}`;
    }, [value.precioMin, value.precioMax]);

    // búsqueda dentro de barrios (útil)
    const [qBarrio, setQBarrio] = useState("");
    const barriosFiltrados = useMemo(() => {
        const q = qBarrio.trim().toLowerCase();
        if (!q) return barriosOpts;
        return barriosOpts.filter((b) => b.toLowerCase().includes(q));
    }, [qBarrio]);

    // evita duplicados por data repetida
    const barriosClean = useMemo(() => uniq(barriosFiltrados), [barriosFiltrados]);

    return (
        <div className="fb" ref={wrapRef}>
            <div className="fb-row">
                {/* OPERACION (single) */}
                <div className={`fb-dd ${openKey === "operacion" ? "is-open" : ""}`}>
                    <button className="fb-btn" onClick={() => setOpenKey(openKey === "operacion" ? null : "operacion")}>
                        <span className="fb-btn-text">{labelOperacion}</span>
                        <span className="fb-caret">▾</span>
                    </button>
                    {/* venta alquiler */}
                    {openKey === "operacion" && (
                        <div className="fb-panel">
                            {["Venta", "Alquiler"].map((op) => (
                                <label key={op} className="fb-item">
                                    <input
                                        type="radio"
                                        name="operacion"
                                        checked={value.operacion === op}
                                        onChange={() => {
                                            set({ operacion: op });
                                            setOpenKey(null); // ✅ cierra al seleccionar
                                        }}
                                    />
                                    <span>{op}</span>
                                </label>
                            ))}
                            <button
                                className="fb-link"
                                onClick={() => {
                                    set({ operacion: "Todas" });
                                    setOpenKey(null);
                                }}
                            >
                                Limpiar
                            </button>
                        </div>
                    )}

                </div>

                {/* TIPO (multi) */}
                <div className={`fb-dd ${openKey === "tipo" ? "is-open" : ""}`}>
                    <button className="fb-btn" onClick={() => setOpenKey(openKey === "tipo" ? null : "tipo")}>
                        <span className="fb-btn-text">{labelTipo}</span>
                        <span className="fb-caret">▾</span>
                    </button>

                    <div className="fb-panel">
                        <div className="fb-grid">
                            {tipoProp.map((t) => (
                                <label key={t} className="fb-item">
                                    <input
                                        type="checkbox"
                                        checked={(value.tipoPropiedad || []).includes(t)}
                                        onChange={() => set({ tipoPropiedad: toggleInArray(value.tipoPropiedad || [], t) })}
                                    />
                                    <span>{t}</span>
                                </label>
                            ))}
                        </div>

                        <button className="fb-link" onClick={() => set({ tipoPropiedad: [] })}>
                            Limpiar
                        </button>
                    </div>
                </div>

                {/* BARRIOS (multi + search) */}
                <div className={`fb-dd ${openKey === "barrio" ? "is-open" : ""}`}>
                    <button className="fb-btn" onClick={() => setOpenKey(openKey === "barrio" ? null : "barrio")}>
                        <span className="fb-btn-text">{labelBarrio}</span>
                        <span className="fb-caret">▾</span>
                    </button>

                    <div className="fb-panel fb-panel--scroll">
                        <input
                            className="fb-search"
                            value={qBarrio}
                            onChange={(e) => setQBarrio(e.target.value)}
                            placeholder="Buscar barrio..."
                        />

                        <div className="fb-list">
                            {barriosClean.map((b) => (
                                <label key={b} className="fb-item">
                                    <input
                                        type="checkbox"
                                        checked={(value.barrios || []).includes(b)}
                                        onChange={() => set({ barrios: toggleInArray(value.barrios || [], b) })}
                                    />
                                    <span>{b}</span>
                                </label>
                            ))}
                        </div>

                        <button className="fb-link" onClick={() => set({ barrios: [] })}>
                            Limpiar
                        </button>
                    </div>
                </div>

                {/* AMBIENTES (single) */}
                <div className={`fb-dd ${openKey === "amb" ? "is-open" : ""}`}>
                    <button className="fb-btn" onClick={() => setOpenKey(openKey === "amb" ? null : "amb")}>
                        <span className="fb-btn-text">{labelAmb}</span>
                        <span className="fb-caret">▾</span>
                    </button>

                    <div className="fb-panel">
                        {ambientesOpts.map((a) => (
                            <label key={a} className="fb-item">
                                <input
                                    type="radio"
                                    name="ambientes"
                                    checked={String(value.ambientes || "") === String(a)}
                                    onChange={() => set({ ambientes: a })}
                                />
                                <span>{a === "mas" ? "Más" : a}</span>
                            </label>
                        ))}
                        <button className="fb-link" onClick={() => set({ ambientes: "" })}>
                            Limpiar
                        </button>
                    </div>
                </div>

                {/* PRECIO (min/max) */}
                <div className={`fb-dd ${openKey === "precio" ? "is-open" : ""}`}>
                    <button className="fb-btn" onClick={() => setOpenKey(openKey === "precio" ? null : "precio")}>
                        <span className="fb-btn-text">{labelPrecio}</span>
                        <span className="fb-caret">▾</span>
                    </button>

                    <div className="fb-panel">
                        <div className="fb-price">
                            <input
                                type="number"
                                placeholder="Mín"
                                value={value.precioMin || ""}
                                onChange={(e) => set({ precioMin: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Máx"
                                value={value.precioMax || ""}
                                onChange={(e) => set({ precioMax: e.target.value })}
                            />
                        </div>

                        <button className="fb-link" onClick={() => set({ precioMin: "", precioMax: "" })}>
                            Limpiar
                        </button>
                    </div>
                </div>

                <button className="fb-clear" onClick={onClear}>
                    Limpiar filtros
                </button>
            </div>

            {/* CHIPS seleccionados (debajo) */}
            <div className="fb-chips">
                {/* operacion */}
                {value.operacion && value.operacion !== "Todas" && (
                    <Chip text={value.operacion} onRemove={() => removeChip("operacion")} />
                )}

                {/* tipoPropiedad */}
                {(value.tipoPropiedad || []).map((t) => (
                    <Chip key={`tipo-${t}`} text={t} onRemove={() => removeChip("tipoPropiedad", t)} />
                ))}

                {/* barrios */}
                {(value.barrios || []).map((b) => (
                    <Chip key={`barrio-${b}`} text={b} onRemove={() => removeChip("barrios", b)} />
                ))}

                {/* ambientes */}
                {value.ambientes && (
                    <Chip text={`Amb: ${value.ambientes === "mas" ? "Más" : value.ambientes}`} onRemove={() => removeChip("ambientes")} />
                )}

                {/* precio (lo muestro como chip si hay algo) */}
                {(value.precioMin || value.precioMax) && (
                    <Chip
                        text={`Precio: ${value.precioMin || "0"} - ${value.precioMax || "∞"}`}
                        onRemove={() => set({ precioMin: "", precioMax: "" })}
                    />
                )}
            </div>
        </div>
    );
}

function Chip({ text, onRemove }) {
    return (
        <span className="fb-chip">
            <span className="fb-chip-text">{text}</span>
            <button className="fb-chip-x" onClick={onRemove} aria-label={`Eliminar ${text}`}>
                ×
            </button>
        </span>
    );
}
