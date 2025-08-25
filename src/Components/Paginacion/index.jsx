import React from 'react';
import './estilos.css';

function Paginacion({ currentPage, onPageChange, totalPropiedades, propiedadesPorPagina }) {
    const totalPaginas = Math.ceil(totalPropiedades / propiedadesPorPagina);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPaginas) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (num) => {
        onPageChange(num);
    };

    const getPaginas = () => {
        let paginas = [];

        // Mostrar siempre la primera página
        if (currentPage > 3) {
            paginas.push(1);
            if (currentPage > 4) {
                paginas.push('...');
            }
        }

        // Páginas cercanas a la actual
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 0 && i <= totalPaginas) {
                paginas.push(i);
            }
        }

        // Mostrar última página
        if (currentPage < totalPaginas - 2) {
            if (currentPage < totalPaginas - 3) {
                paginas.push('...');
            }
            paginas.push(totalPaginas);
        }

        return paginas;
    };

    return (
        <div className="paginacion-container">
            <button
                className="paginacion-button"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                Anterior
            </button>

            <div className="paginacion-numeros">
                {getPaginas().map((num, index) =>
                    num === '...' ? (
                        <span key={index} className="paginacion-ellipsis">
                            ...
                        </span>
                    ) : (
                        <button
                            key={index}
                            className={`paginacion-numero ${currentPage === num ? 'activo' : ''}`}
                            onClick={() => handlePageClick(num)}
                        >
                            {num}
                        </button>
                    )
                )}
            </div>

            <button
                className="paginacion-button"
                onClick={handleNextPage}
                disabled={currentPage === totalPaginas}
            >
                Siguiente
            </button>
        </div>
    );
}

export default Paginacion;
