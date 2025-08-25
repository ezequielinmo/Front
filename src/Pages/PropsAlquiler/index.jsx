import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProps } from '../../Redux/Actions';
import FiltrosSelect from '../../Components/FiltrosSelect';
import ListaPropiedades from '../../Components/ListaPropiedades';
import Paginacion from '../../Components/Paginacion';
import Loading from '../../Components/Loading';

function PropsAlquiler() {

    const loading = useSelector(state => state.loading);
    const allProps = useSelector(state => state.propiedades);
    const totalPropiedades = useSelector(state => state.totPropiedades);
    //estados para las propiedades
    const [operacion, setOperacion] = useState('Alquiler');
    const [tipoPropiedad, setTipoPropiedad] = useState('Todas');
    const [ambientes, setAmbientes] = useState(); //en el back lo convierto a int
    const [precioMin, setPrecioMin] = useState();
    const [precioMax, setPrecioMax] = useState();
    //estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const propiedadesPorPagina = 12;
    const limit = propiedadesPorPagina;
    const offset = (currentPage - 1) * limit;
    const dispatch = useDispatch();


    //efecto para iniciar la Pag desd la parte SUPERIOR
    useEffect(() => {
        // Desplaza la página hacia la parte superior cuando el componente se monta
        window.scrollTo(0, 0);
    }, []); // El array vacío asegura que se ejecute solo al montar el componente

    //vuelve el scroll hacia arriba
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    useEffect(() => {
        dispatch(getProps(limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes));
    }, [dispatch, limit, offset, operacion, tipoPropiedad, ambientes, precioMin, precioMax]);

    return (
        <div className='cont-page-ventas'>
            {
                loading ? (
                    <Loading />
                ) : (
                    <div className='cont-titulo-filtros-listaProps'>
                        <h1 className='titulo-busqueda' data-translate>Propiedades en alquiler</h1>
                        <div className='cont-filtros-props'>
                            <div className='cont-filtros-home'>
                                <FiltrosSelect
                                    muestraVntaAlq='true'
                                    precioMin={precioMin}
                                    precioMax={precioMax}
                                    setPrecioMin={setPrecioMin}
                                    setPrecioMax={setPrecioMax}
                                    setCurrentPage={setCurrentPage}
                                    setOperacion={setOperacion}
                                    setTipoPropiedad={setTipoPropiedad}
                                    setAmbientes={setAmbientes}
                                />
                            </div>
                            <div className='cont-listaProps-home'>
                                <ListaPropiedades allProps={allProps} vista="Alquiler" id='listaProps' />
                                {
                                    allProps.length > 0 && (
                                        <Paginacion
                                            allProps={allProps}
                                            currentPage={currentPage}
                                            onPageChange={setCurrentPage}
                                            totalPropiedades={totalPropiedades}
                                            propiedadesPorPagina={propiedadesPorPagina}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default PropsAlquiler;