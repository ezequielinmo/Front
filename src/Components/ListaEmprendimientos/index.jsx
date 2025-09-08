import React from 'react';
import { useMediaQuery } from 'react-responsive';
import CardEmprendimiento from '../CardEmprendimiento';
import CardEmprendimientoTel from '../CardEmprendimientoTel';
import './styles.css';

function ListaEmprendimientos({ allEmp, isPage }) {
    const isMobile = useMediaQuery({ maxWidth: 800 });

    return (
        <div className="cont-lista-emprendimientos">
            {allEmp?.map(emp =>
                isMobile
                    ? <CardEmprendimientoTel key={emp.id} {...emp} />
                    : <CardEmprendimiento key={emp.id} {...emp} />
            )}
        </div>
    );
}

export default ListaEmprendimientos;
