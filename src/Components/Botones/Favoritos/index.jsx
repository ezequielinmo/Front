import React, { useContext } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { InmobiliariaContext } from '../../../Context';
import './estilos.css';

const Favorito = ({ id, direccionF, cantCocheras, operacion, imagenes, tituloPublicacion, ambientes, dormitorios, unidadMedida, tipo }) => {
    const { favoritos, toggleFavorito } = useContext(InmobiliariaContext);
    const isFavorite = favoritos?.some((p) => p.id === id);

    const toggleFavorite = () => {
        toggleFavorito({
            id,
            direccionF,
            cantCocheras,
            operacion,
            imagenes,
            tituloPublicacion,
            ambientes,
            dormitorios,
            unidadMedida,
            tipo,
        });
    };

    return (
        <button className="favorite-button" onClick={toggleFavorite}>
            <FavoriteIcon className={`icono-fav ${isFavorite ? 'favorited' : ''}`} />
        </button>
    );
};

export default Favorito;
