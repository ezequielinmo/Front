import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isOpenModalPicture } from '../../Redux/Actions';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Modal from '../../Components/Modal';
import CarruselImgPequeñas from '../CarruselImgPequeñas';
import './styles.css';

function Carrusel({imagenes}) {

    const [indexImgActual, setIndexImgActual] = useState(0);
    const dispatch = useDispatch();    
    const isOpen = useSelector(state => state.isOpenModalPicture);

    const handleClickPrev = () => {
        if(indexImgActual === 0){ return }
        else{
            setIndexImgActual(indexImgActual - 1);
        }
    };
    const handleClickNext = () => {
        if(indexImgActual === imagenes.length -1){ return }
        else{
            setIndexImgActual(indexImgActual + 1);
        }
    };
    /* funcion para mostrar la img selecc de las de abajo */
    const handleClick = ( index ) => {
        setIndexImgActual(index);
    };
    const handleOpenModal = () => {
        dispatch(isOpenModalPicture());
    };
    
    return (
        <div className='contGralCarrusel'>
            <div className='cont-img-btns'>
                {/* btn atrás */}
                <button className='btn-carrusel-prev' onClick={() => handleClickPrev()}>
                    <ArrowBackIosNewIcon />
                </button>

                {/* imagen a mostrar */}
                <img 
                    src={imagenes[indexImgActual].original || imagenes[indexImgActual].imagen} 
                    alt='' 
                    onClick={() => handleOpenModal()}
                    className='img-carrusel'
                />
                {/* btn prox */}
                <button className='btn-carrusel-next' onClick={() => handleClickNext()}>
                    <ArrowForwardIosIcon />
                </button>
            </div>

            {/* cont imagenes pequeñas */}
            <div className='cont-imgs-peq'>
                <CarruselImgPequeñas 
                    imagenes={imagenes}
                    indexImgActual={indexImgActual}
                    handleClick={handleClick}
                />
            </div>

            {/* Modal img */}
            {
                isOpen && (
                    <div className='modal-overlay'>
                        <Modal imagenes={imagenes}/>
                    </div>
                )
            }
            
        </div>
    )
}

export default Carrusel