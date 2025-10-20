import React, { useEffect, useContext } from 'react';
import { InmobiliariaContext } from '../../Context';
import ListaFavoritos from '../../Components/ListaFavoritos';
import './styles.css';

function FavoritosPage() {
    const { favoritos } = useContext(InmobiliariaContext);

    // Desplaza la página hacia arriba al montar
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='page-favoritos'>
            <ListaFavoritos allProps={favoritos} />
        </div>
    );
}

export default FavoritosPage;
