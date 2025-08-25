import React, { useState } from "react";
import './style.css';

function FiltrosSelect({
    verTipoOperacion,
    setOperacion,
    setTipoPropiedad,
    setAmbientes,
    setPrecioMin,
    setPrecioMax,
}) {
    const operacion = ['Todas', 'Venta', 'Alquiler', 'Emprendimiento'];
    const tipoProp = [
        'Todas', 'Departamento', 'Casa', 'PH', 'Local',
        'Oficina', 'Cochera', 'Terreno', 'Galpón',
    ];
    const ambientes = ['1', '2', '3', '4', 'mas'];

    const [localMin, setLocalMin] = useState('');
    const [localMax, setLocalMax] = useState('');

    const onChangeTipoOp = (e) => setOperacion(e.target.value);
    const onChangeTipoProp = (e) => setTipoPropiedad(e.target.value);
    const onChangeAmb = (e) => setAmbientes(e.target.value);

    const aplicarRangoPrecios = () => {
        setPrecioMin(localMin);
        setPrecioMax(localMax);
    };

    return (
        <div className="cont-filtrosSelect">
            <div className="subCont-filtrosSelect">
                <div className="cont-filtro-tipoOperacion">
                    <p className='focoCompra'>Filtros</p>
                </div>
                <div className="cont-selects">
                    <div className="cont-op-tipoP">
                        {
                            verTipoOperacion === 'true' &&
                            <select onChange={onChangeTipoOp} className="select-tipoProp">
                                <option>Tipo de operación</option>
                                {operacion.map(op => (
                                    <option key={op} value={op}>{op}</option>
                                ))}
                            </select>
                        }
                        <select onChange={onChangeTipoProp} className="select-tipoProp">
                            <option>Tipo de propiedad</option>
                            {tipoProp.map(prop => (
                                <option key={prop} value={prop}>{prop}</option>
                            ))}
                        </select>
                    </div>

                    <div className="cont-amb-destacadas">
                        <select onChange={onChangeAmb} className="select-tipoProp">
                            <option>Ambientes</option>
                            {ambientes.map(amb => (
                                <option key={amb} value={amb}>{amb}</option>
                            ))}
                        </select>
                    </div>

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
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FiltrosSelect;
