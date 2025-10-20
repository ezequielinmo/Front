import React, { useState } from "react";
import './style.css';

function FiltrosSelect({
    verTipoOperacion,
    setOperacion,
    setTipoPropiedad,
    setBarrios,
    setAmbientes,
    setPrecioMin,
    setPrecioMax,
    setCurrentPage,
    scrollToLista
}) {
    const operacion = ['Todas', 'Venta', 'Alquiler', 'Emprendimiento'];
    const tipoProp = [
        'Departamento', 'Casa', 'PH', 'Local',
        'Oficina', 'Cochera', 'Terreno', 'Galpón',
    ];
    const ambientes = ['1', '2', '3', '4', 'mas'];
    const barrios = [
        "Arenas Chico",
        "Arenas del Sur",
        "Arenas del Sur",
        "Aureal Park",
        "Barracas de San Benito",
        "Casonas del Harás",
        "Cenderos de Rumenco",
        "Centro",
        "Chapadmalal",
        "Chauvin",
        "Costa del Sol",
        "Developer Aqua",
        "Developer Park",
        "Don Bosco",
        "El Gaucho",
        "El Marquesado",
        "Guemes",
        "Harás del Mar",
        "La Armonía",
        "La Armonía",
        "La Cercania",
        "La Florida",
        "La Perla",
        "Las Margaritas",
        "Las Prunas",
        "Lomas De Stella Maris",
        "Los Troncos",
        "Macrocentro",
        "Marayui",
        "Olas Chapadmalal",
        "Piñares de Santa Clara",
        "Playa Chica",
        "Playa Grande",
        "Plaza España",
        "Plaza Mitre",
        "Rumenco",
        "Rumenco joven",
        "San Carlos",
        "Santa Cecilia",
        "Sierra De Los Padres",
        "Stella Maris",
        "Terminal Vieja",
        "Villa Primera",
        "Varese"
    ];

    //estados locales
    const [tipoPropSeleccionada, setTipoPropSeleccionada] = useState([]);
    const [localMin, setLocalMin] = useState('');
    const [localMax, setLocalMax] = useState('');
    const [barriosSeleccionados, setBarriosSeleccionados] = useState([]);

    const onChangeTipoOp = (e) => setOperacion(e.target.value);
    const onChangeTipoProp = (e) => {
        const value = e.target.value;
        if (value !== "TipoProp" && !tipoPropSeleccionada.includes(value)) {
            const propsSeleccionadas = [...tipoPropSeleccionada, value];
            setTipoPropSeleccionada(propsSeleccionadas);
            setTipoPropiedad(propsSeleccionadas);
        }
    };
    const onChangeAmb = (e) => setAmbientes(e.target.value);
    const onChangeBarrio = (e) => {
        const value = e.target.value;
        if (value !== "Barrio" && !barriosSeleccionados.includes(value)) {
            const nuevosBarrios = [...barriosSeleccionados, value];
            setBarriosSeleccionados(nuevosBarrios);
            setBarrios(nuevosBarrios); // sincronizamos con el padre
        }
    };

    const eliminarTipoPropSel = (tipoP) => {
        const nuevosTipoProp = tipoPropSeleccionada.filter(p => p !== tipoP);
        setTipoPropSeleccionada(nuevosTipoProp);
        setTipoPropiedad(nuevosTipoProp);
    }
    const eliminarBarrio = (barrio) => {
        const nuevosBarrios = barriosSeleccionados.filter(b => b !== barrio);
        setBarriosSeleccionados(nuevosBarrios);
        setBarrios(nuevosBarrios);
    };

    // FiltrosSelect.jsx
    const aplicarRangoPrecios = () => {
        setPrecioMin(localMin);
        setPrecioMax(localMax);
        if (setCurrentPage) setCurrentPage(1); // 👈 reset a la primera página
        if (scrollToLista) scrollToLista();    // 👈 hace scroll al listado
    };

    return (
        <div className={verTipoOperacion ? "cont-filtrosSelect" : "cont-filtrosSelect-Venta"}>
            <div className="subCont-filtrosSelect">
                <div className={verTipoOperacion ? "cont-filtro-titulo" : "cont-filtro-titulo-Venta"}>
                    <p className={verTipoOperacion ? "titulo-filtros" : "titulo-filtros-Venta"}>Filtros</p>
                </div>
                <div className="cont-selects-filtros">
                    {/* porp, op, barrio, amb */}
                    <div className="cont-items-noPrecio">
                        {/* tipo op */}
                        {
                            verTipoOperacion === true &&
                            <div className="cont-op-tipoP">
                                <select onChange={onChangeTipoOp} className="select-tipoProp">
                                    <option>Tipo de operación</option>
                                    {operacion.map(op => (
                                        <option key={op} value={op}>{op}</option>
                                    ))}
                                </select>
                            </div>
                        }
                        {/* tipo prop */}
                        <div className="cont-tipo-prop">
                            <select onChange={onChangeTipoProp} className="select-tipoProp">
                                <option>Tipo de propiedad</option>
                                {tipoProp.map(prop => (
                                    <option key={prop} value={prop}>{prop}</option>
                                ))}
                            </select>
                        </div>
                        {/* barrios */}
                        <div className="cont-amb-barrio">
                            <select onChange={onChangeBarrio} className="select-tipoProp">
                                <option>Barrio</option>
                                {barrios.map((barrio, index) => (
                                    <option key={index} value={barrio}>{barrio}</option>
                                ))}
                            </select>
                        </div>
                        {/* ambientes */}
                        <div className="cont-amb">
                            <select onChange={onChangeAmb} className="select-tipoProp">
                                <option>Ambientes</option>
                                {ambientes.map(amb => (
                                    <option key={amb} value={amb}>{amb}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* precios */}
                    <div className="cont-primario-precio">
                        <div className="cont-filtro-precioMaxMin">
                            <label>Precio</label>
                            <input
                                type="number"
                                value={localMin}
                                onChange={(e) => setLocalMin(e.target.value)}
                                placeholder="Desde"
                                className="input-precioMin"
                            />
                            <input
                                type="number"
                                value={localMax}
                                onChange={(e) => setLocalMax(e.target.value)}
                                placeholder="Hasta"
                                className="input-precioMin"
                            />
                            <button
                                className="btn-aplicar-precio"
                                onClick={aplicarRangoPrecios}
                            >
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mostrar tipoProp seleccionadas */}
            {tipoPropSeleccionada.length > 0 && (
                <div className="barrios-seleccionados">
                    {tipoPropSeleccionada.map(p => (
                        <div key={p} className="barrio-item">
                            <span>{p}</span>
                            <button
                                onClick={() => eliminarTipoPropSel(p)}
                                className="btn-eliminar-barrio"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {/* Mostrar barrios seleccionados */}
            {barriosSeleccionados.length > 0 && (
                <div className="barrios-seleccionados">
                    {barriosSeleccionados.map(b => (
                        <div key={b} className="barrio-item">
                            <span>{b}</span>
                            <button
                                onClick={() => eliminarBarrio(b)}
                                className="btn-eliminar-barrio"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FiltrosSelect;
