import React, { useState, useEffect } from 'react';
import './styles.css';

const FormularioContacto = ({ tituloPublicacion, codigoReferencia }) => { 
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const numeroTelefonoAsignado = "2235554552";
    // Iniciamos el mensaje vacío
    const [mensaje, setMensaje] = useState('');

    //funcion envio de email [cambiar API TOKKO]
    const sendTokkoApi = async (nombre, email, telefono, mensaje) => {

        const apiKey = "1fa6028de7df18808d1d4c40f7e48e51f79d31a3"; //api de tokko
        const url = `https://tokkobroker.com/api/v1/webcontact/?key=${apiKey}`
        
        const payload = {        
            api_key: apiKey,
            name: nombre,
            email: email,
            phone: telefono,
            tags: mensaje
        };
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                const text = await response.text();
                if (text) {
                    const jsonResponse = JSON.parse(text)
                    return jsonResponse;
                } else {
                    console.warn('La respuesta no contiene un cuerpo JSON.')
                    return {}; 
                }        
            } else {
                console.error('Error al enviar los datos a la API de Tokko')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre && telefono && email && mensaje) {
            sendTokkoApi(nombre, email, telefono, mensaje);
            setNombre('');
            setTelefono('');
            setEmail('');
        }else{
            alert('Completa todos los campos');
        }
    };

    const handleLlamar = () => {
        window.location.href = `tel:${numeroTelefonoAsignado}`;
    };

    // Ajustar la altura del textarea dinámicamente
    const autoResizeTextarea = (e) => {
        e.target.style.height = 'auto';  // Reinicia la altura
        e.target.style.height = `${e.target.scrollHeight}px`;  // Ajusta la altura al contenido
    };

    // Usamos useEffect para actualizar el mensaje cuando cambian tituloPublicacion y codigoReferencia
    useEffect(() => {
        if(!tituloPublicacion){
            setMensaje(`Hola, me contactan por favor...gracias.`);
        }else{
            setMensaje(`Hola, quisiera saber más acerca de: Cod Ref: ${codigoReferencia}. ${tituloPublicacion}`);
        }
    }, [tituloPublicacion, codigoReferencia]);

    useEffect(() => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [mensaje]); // Reajustamos la altura cada vez que cambia el mensaje

    return (
        <form onSubmit={handleSubmit} className='div-cont-form'>
                <h2 style={{margin:'0'}}>Formulario de contacto</h2>
                <div className="form__group field">
                    <input required className="form__field" type="text" name='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    <label className="form__label" htmlFor="name" data-translate>Nombre y Apellido</label>
                </div>

                <div className="form__group field">
                    <input required className="form__field" type="text" name='telefono' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    <label className="form__label" htmlFor="name" data-translate>Telefono</label>
                </div>

                <div className="form__group field">
                    <input required className="form__field" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="form__label" htmlFor="name" data-translate>Email</label>
                </div>
                
                <div className="form__group field">
                    <textarea 
                        required 
                        className="textarea-form-contacto" 
                        value={mensaje} 
                        name="msj" 
                        onChange={(e) => setMensaje(e.target.value)} 
                        onInput={autoResizeTextarea}
                        style={{ overflow: 'hidden', fontSize: '16px' }}  // Ajusta el tamaño de fuente
                    />
                    <label className="form__label" htmlFor="name">Mensaje</label>
                </div>

                <div className='btn-enviar-contacto'>
                    <div className='cont-btn-form'>
                        <button 
                            variant="outlined" 
                            type="submit"  
                            className='btn-form'
                            data-translate
                        >
                            Enviar
                        </button>
                        <button 
                            type='button' 
                            className='btn-form' 
                            onClick={handleLlamar}
                            data-translate
                        >
                            Llamar
                        </button>
                    </div>
                    
                </div>
        </form>
    );
};

export default FormularioContacto;
