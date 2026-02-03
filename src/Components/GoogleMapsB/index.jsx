import React, { useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "./styles.css";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const defaultCenter = { lat: -38.0055, lng: -57.5426 }; // Mar del Plata aprox

function toNumber(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

function getId(p) {
    return p?.id ?? p?._id ?? p?.codigoReferencia;
}

export default function PropertiesMap({
    items = [],
    selectedId,
    onSelect,
    onBoundsChange,
    apiKey, // opcional: si querés pasarlo por props
}) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey || process.env.REACT_APP_GOOGLE_MAPS_API_KEY, //la apiKey de googleMaps
    });

    const mapRef = useRef(null);
    const [localBounds, setLocalBounds] = useState(null);

    // Normalizo props -> markers
    const markers = useMemo(() => {
        return (items || [])
            .map((p) => {
                const lat = toNumber(p?.geoLat);
                const lng = toNumber(p?.geoLong);
                if (lat === null || lng === null) return null;
                return {
                    id: getId(p),
                    position: { lat, lng },
                    raw: p,
                };
            })
            .filter(Boolean);
    }, [items]);

    // Centro inicial: si hay markers, centro en el primero
    const initialCenter = useMemo(() => {
        if (markers.length) return markers[0].position;
        return defaultCenter;
    }, [markers]);

    // Cuando cambia selectedId: centro el mapa en esa propiedad
    useEffect(() => {
        if (!selectedId || !mapRef.current) return;
        const mk = markers.find((m) => String(m.id) === String(selectedId));
        if (!mk) return;
        mapRef.current.panTo(mk.position);
        // un zoom suave si estás muy lejos
        const z = mapRef.current.getZoom();
        if (typeof z === "number" && z < 14) mapRef.current.setZoom(14);
    }, [selectedId, markers]);

    const onLoad = (map) => {
        mapRef.current = map;

        // Ajusto bounds para abarcar markers (si hay)
        if (markers.length >= 2) {
            const bounds = new window.google.maps.LatLngBounds();
            markers.forEach((m) => bounds.extend(m.position));
            map.fitBounds(bounds);
        } else if (markers.length === 1) {
            map.setCenter(markers[0].position);
            map.setZoom(14);
        } else {
            map.setCenter(defaultCenter);
            map.setZoom(12);
        }

        // guardo bounds iniciales
        const b = map.getBounds();
        if (b) setLocalBounds(b);
    };

    const handleIdle = () => {
        if (!mapRef.current) return;
        const b = mapRef.current.getBounds();
        if (b) setLocalBounds(b);
    };

    const handleZoneSearch = () => {
        if (!localBounds || !onBoundsChange) return;

        const ne = localBounds.getNorthEast();
        const sw = localBounds.getSouthWest();

        onBoundsChange({
            ne: { lat: ne.lat(), lng: ne.lng() },
            sw: { lat: sw.lat(), lng: sw.lng() },
        });
    };

    if (!isLoaded) {
        return (
            <div className="map-wrap">
                <div className="map-loading">Cargando mapa...</div>
            </div>
        );
    }

    return (
        <div className="map-wrap">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={initialCenter}
                zoom={13}
                onLoad={onLoad}
                onIdle={handleIdle}
                options={{
                    fullscreenControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    clickableIcons: false,
                    // estilos opcionales (si querés look más limpio)
                    // styles: [],
                }}
            >
                {markers.map((m) => (
                    <Marker
                        key={m.id}
                        position={m.position}
                        onClick={() => onSelect?.(m.id)}
                    // Si querés diferenciar seleccionado:
                    // icon={String(m.id) === String(selectedId) ? selectedIcon : defaultIcon}
                    />
                ))}
            </GoogleMap>

            <button className="map-zoneBtn" onClick={handleZoneSearch}>
                Ver resultados en esta zona
            </button>
        </div>
    );
}
