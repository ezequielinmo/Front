import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProps, getPropsDestacadas, getPropsMap, getEmprendimientos } from '../../Redux/Actions';
import Loading from '../../Components/Loading';
import LandigA from '../../Components/LandingA';
import ListaPropiedades from '../../Components/ListaPropiedades'
import ListaPropsDestacadas from '../../Components/ListaPropsDestacadas';
import ListaEmprendimientos from '../../Components/ListaEmprendimientos';
import FiltrosSelect from '../../Components/FiltrosSelect';
import Paginacion from '../../Components/Paginacion';
import Institucional from '../../Components/Institucional';
import MapaPropiedades from '../../Components/MapProps';
import BotonVerTodas from '../../Components/Botones/BotonVerTodas';
import './styles.css';

function Home() {

    const loading = useSelector(state => state.loading);
    const allProps = useSelector(state => state.propiedades);
    const allPropsMap = useSelector(state => state.propsMap);
    const allPropsDestacadas = useSelector(state => state.propsDestacadas);
    const allEmp = useSelector(state => state.emprendimientos);
    const totalPropiedades = useSelector(state => state.totPropiedades);
    //estados para las propiedades
    const [operacion, setOperacion] = useState('');
    const [tipoPropiedad, setTipoPropiedad] = useState('Todas');
    const [ambientes, setAmbientes] = useState(); //en el back lo convierto a int
    const [precioMin, setPrecioMin] = useState();
    const [precioMax, setPrecioMax] = useState();
    const [destacadas, setDestacadas] = useState(false);
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
    //efecto para iniciar pag desde scroll 0
    useEffect(() => {
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    }, []);
    //vuelve el scroll hacia arriba
    useEffect(() => {
        window.scrollTo(0, 600);
    }, [currentPage]);

    useEffect(() => {
        dispatch(getPropsDestacadas());
        dispatch(getEmprendimientos());
        dispatch(getPropsMap(limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas));
        dispatch(getProps(limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas));
    }, [dispatch, limit, offset, operacion, tipoPropiedad, ambientes, precioMin, precioMax, destacadas]);

    return (
        loading ? (
            <Loading />
        ) : (
            <div className='cont-home'>
                <LandigA />
                {/* Destacadas */}
                <div className='cont-home-propsDestacadas'>
                    <ListaPropsDestacadas allPropsDestacadas={allPropsDestacadas} vista={"ambas"} id='listaProps' />
                </div>

                {/* Emprendimientos */}
                {/* <div className='cont-home-Emprendimientos'>
                    <div className='cont-titulo-emp'>
                        <div className='cont-h1-listaEmp'>
                            <h1>Nuestros Emprendimientos</h1>
                        </div>
                        <div className='cont-btn-verTodas-listaEmp'>
                            <BotonVerTodas />
                        </div>
                    </div>
                    <div className='cont-lista-emp-home'>
                        <ListaEmprendimientos allEmp={allEmp} />
                    </div>
                </div> */}

                {/* filtros */}
                <div className='cont-filtros-props'>
                    <div className='cont-filtros-home'>
                        <FiltrosSelect
                            verTipoOperacion='true'
                            precioMin={precioMin}
                            precioMax={precioMax}
                            destacadas={destacadas}
                            setPrecioMin={setPrecioMin}
                            setPrecioMax={setPrecioMax}
                            setCurrentPage={setCurrentPage}
                            setOperacion={setOperacion}
                            setTipoPropiedad={setTipoPropiedad}
                            setAmbientes={setAmbientes}
                            setDestacadas={setDestacadas}
                        />
                    </div>
                </div>
                {/* Lista props */}
                <div className='cont-home-propsDestacadas'>
                    <div className='cont-titulo-emp'>
                        <div className='cont-h1-listaEmp'>
                            <h1>Nuestras Propiedades</h1>
                        </div>
                        <div className='cont-btn-verTodas-listaEmp'>
                            <button onClick={() => { onClickListaProps() }}>Lista</button>
                            <button onClick={() => { onClickMapaProps() }}>Mapa</button>
                        </div>
                    </div>
                    {
                        listaProps === true && vistaMapa === false &&
                        <>
                            <ListaPropiedades allProps={allProps} vista={"ambas"} id='listaProps' />
                            {/* Paginación */}
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
                        </>
                    }
                    {
                        listaProps === false && vistaMapa === true &&
                        <>
                            <MapaPropiedades propiedades={allPropsMap} />
                        </>
                    }

                </div>

                {/* Institucional */}
                <Institucional />
            </div>
        )
    )
}

export default Home