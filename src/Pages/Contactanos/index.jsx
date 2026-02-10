import React, { useEffect, useState } from 'react';
import RoomIcon from '@mui/icons-material/Room';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapaPropiedades from '../../Components/MapProps';
import './estilos.css';

function Contactanos() {

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
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
        } else {
            alert('Completa todos los campos');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="contactanos">
            {/* Cont SUP */}
            <div className='cont-sup'>
                <p className='texto-1'>Estamos aquí para ayudarte</p>
                <h1 className='texto-2'>Contacto</h1>
                <p className='texto-3'>¿Tenés alguna consulta? Nuestro equipo está listo para ayudarte en tu próximo paso inmobiliario.</p>
            </div>
            {/* Cont INF */}
            <div className='cont-inf'>
                {/* COLUMNA IZQUIERDA */}
                <div className="contactanos-form">
                    <div className="form-header">
                        <span className="form-icon">💬</span>
                        <div>
                            <h2>Envíanos un mensaje</h2>
                            <p>Te contactamos a la brevedad</p>
                        </div>
                    </div>
                    {/* formulario */}
                    <form className="formulario" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nombre completo</label>
                                <input required placeholder="Tu nombre" type="text" name='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input required className="form__field" type="text" name='telefono' value={telefono} placeholder="223 XXX XXXX" onChange={(e) => setTelefono(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input required className="form__field" type="email" name="email" value={email} placeholder="tu@email.com" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Mensaje</label>
                            <textarea
                                required
                                className="textarea-form-contacto"
                                value={mensaje}
                                name="msj"
                                onChange={(e) => setMensaje(e.target.value)}
                                placeholder='mesaje'
                                style={{ overflow: 'hidden', fontSize: '16px' }}  // Ajusta el tamaño de fuente
                            />
                        </div>

                        <button 
                            variant="outlined" 
                            type="submit" 
                            className="btn-enviar">
                            Enviar mensaje
                        </button>
                    </form>
                </div>

                {/* COLUMNA DERECHA */}
                <div className="contactanos-info">
                    <div className="info-cards">
                        <div className="info-card">
                            <RoomIcon />
                            <h4>Dirección</h4>
                            <p>Mar del Plata, Argentina</p>
                            <span>Buenos Aires</span>
                        </div>

                        <div className="info-card">
                            <CallIcon />
                            <h4>Teléfono</h4>
                            <p>2235554552</p>
                            <span>Lunes a Viernes</span>
                        </div>

                        <div className="info-card">
                            <EmailIcon />
                            <h4>Email</h4>
                            <p>ezequieljosepropiedades@gmail.com</p>
                            <span>Respondemos en 24h</span>
                        </div>

                        <div className="info-card">
                            <AccessTimeIcon />
                            <h4>Horario</h4>
                            <p>9:00 - 18:00</p>
                            <span>Lunes a Viernes</span>
                        </div>

                    </div>

                    {/* IMAGEN */}
                    <div className="contactanos-imagen">
                        <div className='cont-mapa-contacto'>
                            <MapaPropiedades lat={-38.019081} lng={-57.543701} />
                        </div>
                        <div className="imagen-overlay">
                            <strong>Ezequiel Jose Estudio Inmobiliario</strong>
                            <span>Mar del Plata, Argentina</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Contactanos;





/* 


<div className='cont-info-ofi-Y-formulario'>
                <div className='cont-info-ofi'>
                    <div className='cont-dataOficina'>
                        <h2 style={{ margin: '5px 0 0 0' }}>Nuestra oficina</h2>
                        <div className='sub-cont-info-Contacto-1'>
                            <RoomIcon sx={{ marginRight: '5px' }} />
                            <p >Viamonte 3084 - Mar del Plata</p>
                        </div>
                        <div className='sub-cont-info-Contacto-1'>
                            <EmailIcon sx={{ marginRight: '5px' }} />
                            <p>info@ezequieljosepropiedades.com</p>
                        </div>
                        <div className='sub-cont-info-Contacto-1'>
                            <CallIcon sx={{ marginRight: '5px' }} />
                            <p>2235554552</p>
                        </div>
                        <div className='divLinks'>
                            <h2>Seguinos</h2>
                            <div className='cont-iconos-redes'>
                                <a
                                    href="https://www.instagram.com/ezequieljose_propiedades/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ marginLeft: '5px' }}
                                >
                                    <InstagramIcon sx={{ color: 'white' }} />
                                </a>
                                <a
                                    href='http://api.whatsapp.com/send?phone=2235554552'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ marginLeft: '5px' }}
                                >
                                    <WhatsAppIcon sx={{ color: 'white' }} />
                                </a>
                            </div>
                        </div>
                        //mapa 
                        <div className='cont-mapa-contacto'>
                            <MapaPropiedades lat={-38.019081} lng={-57.543701} />
                        </div>
                    </div>

                    <div className='cont-formulario-page'>
                        <FormularioContacto />
                    </div>
                </div>
            </div>



*/