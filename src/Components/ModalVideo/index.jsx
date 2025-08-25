import React, { useContext } from 'react'
import { InmobiliariaContext } from '../../Context'
import './estilos.css';


function ModalVideo({video}) {

    const contexto = useContext(InmobiliariaContext);

    return (
        <div className='contModalVideo'>
            <div className='cont-btn-cierra-modalVideo'>
                <button
                    className='btn-close-modal-img'
                    onClick={() => contexto.handleIsClose()}
                >
                    <b>X</b>
                </button>
            </div>

            {
                video ? (
                    <iframe
                        width="80%"
                        height="80%"
                        src={video}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>
                ) : (
                    <h2 style={{color:'white'}} data-translate>Por el momento la propiedad no tiene Viedo</h2>
                )
            }
        </div>
    )

}

export default ModalVideo;