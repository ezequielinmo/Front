import React from 'react';
import CardEmprendimiento from '../CardEmprendimiento';
import './styles.css';

function ListaEmprendimientos({ allEmp }) {
    return (
        <div className="cont-lista-emprendimientos">
            {allEmp?.map(emp => (
                <CardEmprendimiento key={emp.id} {...emp} />
            ))}
        </div>
    );
}

export default ListaEmprendimientos;
