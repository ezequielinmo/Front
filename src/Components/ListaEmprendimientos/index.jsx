import React from 'react';
import CardEmprendimiento from '../CardEmprendimiento';
import './styles.css';

function ListaEmprendimientos({ allEmp = [] }) {
    const hasItems = Array.isArray(allEmp) && allEmp.length > 0;

    if (!hasItems) {
        return (
            <div className="emp-empty">
                <h3 className="emp-empty-title">No hay emprendimientos para mostrar</h3>
                <p className="emp-empty-sub">
                    Probá de nuevo en unos minutos o consultanos y te pasamos opciones disponibles.
                </p>
            </div>
        );
    }

    return (
        <div className="cont-lista-emprendimientos">
            {allEmp.map(emp => (
                <CardEmprendimiento key={emp.id} {...emp} />
            ))}
        </div>
    );
}

export default ListaEmprendimientos;
