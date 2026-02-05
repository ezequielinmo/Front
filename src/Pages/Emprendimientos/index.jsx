import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmprendimientos } from '../../Redux/Actions';
import Loading from '../../Components/Loading';
import ListaEmprendimientos from '../../Components/ListaEmprendimientos';
import './styles.css';

function Emprendimientos() {
    const loading = useSelector(state => state.loading);
    const allEmp = useSelector(state => state.emprendimientos);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getEmprendimientos());
    }, [dispatch]);

    return (
        <div className="emp-page">

            {/* ░░░ HERO PROFESIONAL ░░░ */}
            <section className="emp-hero">
                <div className="emp-hero-content">
                    <h1 className="emp-hero-title">Emprendimientos y oportunidades de negocios</h1>
                    <p className="emp-hero-sub">
                        Encontrá proyectos en desarrollo, lanzamientos y propuestas destacadas en tu zona.
                    </p>

                    <div className="emp-hero-tags">
                        <span>En pozo</span>
                        <span>En construcción</span>
                        <span>Entrega próxima</span>
                    </div>
                </div>
            </section>

            {/* LISTA */}
            <div className="emp-list-wrapper">
                {loading ? <Loading /> : <ListaEmprendimientos allEmp={allEmp} />}
            </div>

        </div>
    );
}

export default Emprendimientos;
