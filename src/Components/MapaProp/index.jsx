import React from 'react';
import './estilos.css'; // Archivo CSS para los estilos del mapa

const MapProp = ({ lat,lng }) => {

    //apikey google map
    const apiKey = process.env.REACT_APP_API_GOOGLE_MAP;

    // Función para generar la URL de Google Maps con la dirección proporcionada
    const generateMapUrl = (lat, lng) => {
        const baseUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}`;
        return `${baseUrl}&q=${lat},${lng}`;
    };

    return (
        <iframe
            title="Map"
            className="iframe-map"
            src={generateMapUrl(lat, lng)}
            allowFullScreen
        ></iframe>
    );
};

export default MapProp;