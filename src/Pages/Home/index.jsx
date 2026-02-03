import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProps, getPropsDestacadas, getPropsMap, getEmprendimientos } from '../../Redux/Actions';
import Loading from '../../Components/Loading';
import LandigA from '../../Components/LandingA';
import LandingB from '../../Components/LandingB';
import LandingProps from '../../Components/LandingProps';
import Institucional from '../../Components/Institucional';
//import MapaPropiedades from '../../Components/MapProps';
//import BotonVerTodas from '../../Components/Botones/BotonVerTodas';
import GoogleReviewsWidget from '../../Components/GoogleComentarios';
import './styles.css';



function Home() {

    const loading = useSelector(state => state.loading);
    const allProps = useSelector(state => state.propiedades);
    //const allPropsMap = useSelector(state => state.propsMap);
    //const allPropsDestacadas = useSelector(state => state.propsDestacadas);
    //const allEmp = useSelector(state => state.emprendimientos);
    //const totalPropiedades = useSelector(state => state.totPropiedades);
    //estados para las propiedades
    const [operacion, setOperacion] = useState(''); 
    const [tipoPropiedad, setTipoPropiedad] = useState([]);
    const [ambientes, setAmbientes] = useState(); //en el back lo convierto a int
    const [barrios, setBarrios] = useState([]);
    const [precioMin, setPrecioMin] = useState();
    const [precioMax, setPrecioMax] = useState();
    const [destacadas, /* setDestacadas */] = useState(false);
    //const [listaProps, setListaProps] = useState(true);
    //const [vistaMapa, setVistaMapa] = useState(false);

    //estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const propiedadesPorPagina = 12;
    const limit = propiedadesPorPagina;
    const offset = (currentPage - 1) * limit;
    const dispatch = useDispatch();

    /* const onClickListaProps = () => {
        setListaProps(!listaProps);
        setVistaMapa(!vistaMapa);
    }
    const onClickMapaProps = () => {
        setVistaMapa(!vistaMapa);
        setListaProps(!listaProps);
    } */
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
        dispatch(getPropsMap(limit, offset, operacion, tipoPropiedad, barrios, precioMin, precioMax, ambientes, destacadas));
        dispatch(getProps(limit, offset, operacion, tipoPropiedad, barrios, precioMin, precioMax, ambientes, destacadas));
    }, [dispatch, limit, offset, operacion, tipoPropiedad, ambientes, barrios, precioMin, precioMax, destacadas]);

    return (
        loading ? (
            <Loading />
        ) : (
            <div className='cont-home'>
                {/* Landing A */}
                <LandigA
                    setCurrentPage={setCurrentPage}
                    setOperacion={setOperacion}
                    setTipoPropiedad={setTipoPropiedad}
                    setBarrios={setBarrios}
                    setAmbientes={setAmbientes}
                    setPrecioMin={setPrecioMin}
                    setPrecioMax={setPrecioMax}
                />

                {/* Propiedades */}
                <div className='section-props'>
                    <LandingProps allProps={allProps}/>
                </div>

                {/* Tasación */}
                <LandingB />

                {/* Institucional 2*/}
                <Institucional />

                {/* comentarios Google */}
                <GoogleReviewsWidget />
            </div>
        )
    )
}

export default Home