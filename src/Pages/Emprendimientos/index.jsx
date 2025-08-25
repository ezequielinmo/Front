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

    //efecto para iniciar la Pag desd la parte SUPERIOR
    useEffect(() => {
        // Desplaza la página hacia la parte superior cuando el componente se monta
        window.scrollTo(0, 0);
    }, []); // El array vacío asegura que se ejecute solo al montar el componente

    useEffect(() => {
        dispatch(getEmprendimientos());
    }, [dispatch]);

    return (
        <div className='cont-emprendi-page'>
            {
                loading ? (
                    <Loading />
                ) : (
                    <div className='cont-titulo-y-props-venta'>
                        <div className='cont-titulo-emp'>
                            <p className='titulo-props-emprendimientos' >Emprendimientos y oportunidades de negocios</p>
                        </div>
                        {/* Destacadas */}
                        <div className='cont-emp-page'>
                            <ListaEmprendimientos allEmp={allEmp} />
                        </div>
                    </div>


                )
            }
        </div>
    )
}

export default Emprendimientos;