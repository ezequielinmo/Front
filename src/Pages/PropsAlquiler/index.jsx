import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProps } from '../../Redux/Actions';
import FiltrosSelect from '../../Components/FiltrosSelect';
import ListaPropiedades from '../../Components/ListaPropiedades';
import MapaPropiedades from '../../Components/MapProps';
import Loading from '../../Components/Loading';


function PropsVenta() {

    const loading = useSelector(state => state.loading);
    const allProps = useSelector(state => state.propiedades);
    const totalPropiedades = useSelector(state => state.totPropiedades);
    const allPropsMap = useSelector(state => state.propsMap);
    //estados para las propiedades
    const [operacion, setOperacion] = useState('Alquiler');
    const [tipoPropiedad, setTipoPropiedad] = useState([]);
    const [barrios, setBarrios] = useState([]);
    const [ambientes, setAmbientes] = useState(); //en el back lo convierto a int
    const [precioMin, setPrecioMin] = useState();
    const [precioMax, setPrecioMax] = useState();
    const [listaProps, setListaProps] = useState(true);
    const [vistaMapa, setVistaMapa] = useState(false);
    //estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const propiedadesPorPagina = 12;
    const limit = propiedadesPorPagina;
    const offset = (currentPage - 1) * limit;
    const dispatch = useDispatch();

    const onClickListaProps = () => {
        setListaProps(!listaProps);
        setVistaMapa(!vistaMapa);
    }
    const onClickMapaProps = () => {
        setVistaMapa(!vistaMapa);
        setListaProps(!listaProps);
    }

    //efecto para iniciar la Pag desd la parte SUPERIOR
    useEffect(() => {
        // Desplaza la página hacia la parte superior cuando el componente se monta
        window.scrollTo(0, 0);
    }, []); // El array vacío asegura que se ejecute solo al montar el componente

    useEffect(() => {
        dispatch(getProps(limit, offset, operacion, tipoPropiedad, barrios, precioMin, precioMax, ambientes));
    }, [dispatch, limit, offset, operacion, tipoPropiedad, barrios, ambientes, precioMin, precioMax]);

    //vuelve el scroll hacia arriba
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    return (
        <div className='cont-page-ventas'>
            <h1 className='titulo-busqueda'>Propiedades en venta</h1>
            {
                loading ? (
                    <Loading />
                ) : (
                    <div className='cont-lista-propsVentas'>
                        {/* filtros */}
                        <FiltrosSelect
                            verTipoOperacion={false}
                            setCurrentPage={setCurrentPage}
                            setOperacion={setOperacion}
                            setTipoPropiedad={setTipoPropiedad}
                            setBarrios={setBarrios}
                            setAmbientes={setAmbientes}
                            setPrecioMin={setPrecioMin}
                            setPrecioMax={setPrecioMax}
                        />
                        {/* Lista props */}
                        <div className='cont-home-props'>
                            <div className='cont-titulo-y-lista-emp'>
                                <div className='cont-h1-listaEmp'>
                                    <h1>Nuestros Propiedades</h1>
                                </div>
                                <div className='cont-btns-listaProps'>
                                    <button onClick={onClickListaProps}>Lista</button>
                                    <button onClick={onClickMapaProps}>Mapa</button>
                                </div>
                            </div>
                            {
                                listaProps === true && vistaMapa === false &&
                                <>
                                    <ListaPropiedades
                                        allProps={allProps}
                                        vista={"ambas"}
                                        currentPage={currentPage}
                                        onPageChange={setCurrentPage}
                                        totalPropiedades={totalPropiedades}
                                        propiedadesPorPagina={propiedadesPorPagina}
                                        id='listaProps'
                                    />
                                </>
                            }
                            {
                                listaProps === false && vistaMapa === true &&
                                <div className='cont-map-Venta'>
                                    <MapaPropiedades propiedades={allPropsMap} />
                                </div>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default PropsVenta;