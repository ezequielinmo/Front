import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProps, getPropsDestacadas, getPropsMap, getEmprendimientos } from '../../Redux/Actions';
import Loading from '../../Components/Loading';
import LandigA from '../../Components/LandingA';
import LandingB from '../../Components/LandingB';
import Institucional from '../../Components/Institucional';
import GoogleReviewsWidget from '../../Components/GoogleComentarios';
import LandingC from '../../Components/LandingC';
import ListaPropiedades from '../../Components/ListaPropiedades';
import { NavLink } from 'react-router-dom';
import { PAGINATION } from "../../Helps/paginacion";
import './styles.css';


function Home() {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.loading);
    const allProps = useSelector((state) => state.propiedades) || [];
    //const totalPropiedades = useSelector((state) => state.totPropiedades) || 0;

    // filtros
    const [operacion, setOperacion] = useState('');
    const [tipoPropiedad, setTipoPropiedad] = useState([]);
    const [ambientes, setAmbientes] = useState();
    const [barrios, setBarrios] = useState([]);
    const [precioMin, setPrecioMin] = useState();
    const [precioMax, setPrecioMax] = useState();
    const [destacadas] = useState(false);

    // paginación
    const propiedadesPorPagina = PAGINATION.HOME;
    const [, setCurrentPage] = useState(1);
    const limit = propiedadesPorPagina;
    //const offset = 0;

    /* const onPageChange = (page) => {
        setCurrentPage(page);
    }; */

    //esto define qué precio mostrar en Card según el filtro elegido
    const vistaCards = useMemo(() => {
        if (operacion === 'Venta') return 'Venta';
        if (operacion === 'Alquiler') return 'Alquiler';
        return 'ambas'; // cuando no filtrás operación (o "Todas")
    }, [operacion]);

    // scroll inicial
    useEffect(() => {
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    }, []);

    // data
    useEffect(() => {
        dispatch(getPropsDestacadas());
        dispatch(getEmprendimientos());

        dispatch(getPropsMap(limit, 0, operacion, tipoPropiedad, barrios, precioMin, precioMax, ambientes, destacadas));
        dispatch(getProps(limit, 0, operacion, tipoPropiedad, barrios, precioMin, precioMax, ambientes, destacadas));
    }, [dispatch, limit, operacion, tipoPropiedad, ambientes, barrios, precioMin, precioMax, destacadas]);

    return loading ? (
        <Loading />
    ) : (
        <div className="cont-home">
            <LandigA
                setCurrentPage={setCurrentPage}
                setOperacion={setOperacion}
                setTipoPropiedad={setTipoPropiedad}
                setBarrios={setBarrios}
                setAmbientes={setAmbientes}
                setPrecioMin={setPrecioMin}
                setPrecioMax={setPrecioMax}
            />

            <LandingC />

            <div className="section-props">
                <div className="section-props__container">
                    <header className="props-hero">
                        <div className="props-hero__left">

                            <h2 className="props-heading">
                                Algunas de nuestras propiedades
                            </h2>

                            <p className="props-lead">
                                Explorá en nuestra sección PROPIEDADES oportunidades en Mar del Plata y alrededores.
                                Filtrá, compará y guardá favoritas.
                            </p>

                            <div className="props-chips">
                                <NavLink to="/propiedades" className="btn-ir-props">
                                    IR A PROPIEDADES
                                </NavLink>
                            </div>
                        </div>
                    </header>

                    <div className="props-listWrap">
                        <ListaPropiedades
                            variant="home"
                            showPagination={false}
                            allProps={allProps}
                            vista={vistaCards}
                            propiedadesPorPagina={6}
                        />
                    </div>
                </div>
            </div>

            <LandingB />
            <Institucional />
            <GoogleReviewsWidget />
        </div>
    );
}

export default Home;
