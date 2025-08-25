import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '600px'
};

const center = {
    lat: -38.0055,
    lng: -57.5426
};

const MapaPropiedades = ({ propiedades }) => {
    const [propSeleccionada, setPropSeleccionada] = useState(null);
    const [imagenIndex, setImagenIndex] = useState(0);
    const [markers, setMarkers] = useState([]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_MAP //clave google map
    });

    useEffect(() => {
        // ⚠️ Este efecto fuerza una actualización de markers cuando cambian las props
        if (propiedades?.length) {
            const conCoords = propiedades.filter(p => p.geoLat && p.geoLong);
            setMarkers(conCoords);
        }
    }, [propiedades]);

    const cambiarImagen = (direccion) => {
        if (!propSeleccionada?.imagenes?.length) return;

        const total = propSeleccionada.imagenes.length;
        setImagenIndex((prevIndex) =>
            direccion === 'prev'
                ? (prevIndex - 1 + total) % total
                : (prevIndex + 1) % total
        );
    };

    if (!isLoaded) return <p>Cargando mapa...</p>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
        >
            {markers.map((prop) => (
                <Marker
                    key={prop.id}
                    position={{
                        lat: Number(prop.geoLat),
                        lng: Number(prop.geoLong)
                    }}
                    title={prop.titulo}
                    onClick={() => {
                        setPropSeleccionada(prop);
                        setImagenIndex(0);
                    }}
                />
            ))}

            {propSeleccionada && (
                <InfoWindow
                    position={{
                        lat: Number(propSeleccionada.geoLat),
                        lng: Number(propSeleccionada.geoLong)
                    }}
                    onCloseClick={() => setPropSeleccionada(null)}
                >
                    <div style={{ width: '300px', height: '300px', position: 'relative' }}>
                        <img
                            src={propSeleccionada.imagenes[imagenIndex]?.original}
                            alt="not found"
                            style={{ width: '100%', height: '60%', borderRadius: '8px', objectFit: 'cover' }}
                        />

                        {propSeleccionada.imagenes.length > 1 && (
                            <>
                                <button
                                    onClick={() => cambiarImagen('prev')}
                                    style={{
                                        position: 'absolute',
                                        top: '25%',
                                        left: '5px',
                                        background: 'rgba(0,0,0,0.5)',
                                        color: 'red',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '25px',
                                        height: '25px',
                                        cursor: 'pointer'
                                    }}
                                >‹</button>
                                <button
                                    onClick={() => cambiarImagen('next')}
                                    style={{
                                        position: 'absolute',
                                        top: '25%',
                                        right: '5px',
                                        background: 'rgba(0,0,0,0.5)',
                                        color: 'red',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '25px',
                                        height: '25px',
                                        cursor: 'pointer'
                                    }}
                                >›</button>
                            </>
                        )}

                        <h4 style={{ margin: '5px 0' }}>{propSeleccionada.tituloPublicacion}</h4>
                        <p style={{ margin: '5px 0', fontSize: '14px' }}>{propSeleccionada.direccionF}</p>
                        <button
                            onClick={() => window.open(`/detalle/${propSeleccionada.id}`, '_blank')}
                            style={{
                                marginTop: '8px',
                                padding: '5px 10px',
                                fontSize: '14px',
                                backgroundColor: '#2196F3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Detalle
                        </button>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default MapaPropiedades;
