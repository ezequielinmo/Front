import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './styles.css';
import { useDispatch } from 'react-redux';
import { restaMeGusta, sumoMeGusta } from '../../../Redux/Actions';

function MeGusta({ id }) { 

    const [meGusta, setMeGusta] = useState(false);
    const [explode, setExplode] = useState(false);
    const dispatch = useDispatch();

    const onChangeMeGusta = () => {
        const meGustan = JSON.parse(localStorage.getItem('meGustan')) || [];

        if (meGusta) {
            const filtrado = meGustan.filter((p) => p !== id);
            localStorage.setItem('meGustan', JSON.stringify(filtrado));
            dispatch(restaMeGusta(id));
        } else {
            localStorage.setItem('meGustan', JSON.stringify([...meGustan, id]));
            //sumo me gusta en la DB
            dispatch(sumoMeGusta(id));
        }

        setMeGusta(!meGusta);

        // Disparar animación
        setExplode(true);
        setTimeout(() => setExplode(false), 500);
    };

    useEffect(() => {
        const meGustan = JSON.parse(localStorage.getItem('meGustan')) || [];
        setMeGusta(meGustan.includes(id));
    }, [id]);

    return (
        <button className="like-button" onClick={onChangeMeGusta}>
            <div className="icon-container">
                <ThumbUpIcon className={meGusta ? 'seleccionado' : ''} />
                {explode && (
                    <div className="explosion">
                        {[...Array(8)].map((_, i) => (
                            <span key={i} className={`rayito r${i + 1}`} />
                        ))}
                    </div>
                )}
            </div>
        </button>
    );
}

export default MeGusta;
