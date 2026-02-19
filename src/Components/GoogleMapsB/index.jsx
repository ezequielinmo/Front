import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "100%" };

const normalIcon = {
    path: "M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z",
    fillColor: "#cc0000",
    fillOpacity: 0.9,
    strokeWeight: 1,
    scale: 1.1,
};

const hoveredIcon = {
    path: "M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z",
    fillColor: "#f3f78e",     // color navbar 👑
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: "#444",
    scale: 1.6,                // 👈 agrandado
};

function parseLatLng(p) {
    // Formatos posibles (adaptalos si tu API usa otros nombres)
    const latRaw = p?.geoLat;

    const lngRaw = p?.geoLong;

    // Caso: coordenadas como array [lng, lat] (muy común en GeoJSON)
    // Ej: p.coordenadas = [-57.55, -38.01]
    if ((!latRaw || !lngRaw) && Array.isArray(p?.coordenadas) && p.coordenadas.length >= 2) {
        const lngA = Number(p.coordenadas[0]);
        const latA = Number(p.coordenadas[1]);
        if (Number.isFinite(latA) && Number.isFinite(lngA)) return { lat: latA, lng: lngA };
    }

    const lat = Number(latRaw);
    const lng = Number(lngRaw);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return { lat, lng };
}

export default function PropertiesMap({ items = [], selectedId, onSelect, hoveredId }) {
    const mapRef = useRef(null);
    const [mapLoadedTick, setMapLoadedTick] = useState(0);
    const hoveredIdStr = hoveredId != null ? String(hoveredId) : null;
    const selectedIdStr = selectedId != null ? String(selectedId) : null;

    const markers = useMemo(() => {
        return (items || [])
            .map((p) => {
                const ll = parseLatLng(p);
                if (!ll) return null;
                return { ...p, ...ll, idStr: String(p?.id) };
            })
            .filter(Boolean);
    }, [items]);

    // Center fallback (si no hay markers)
    const fallbackCenter = useMemo(() => ({ lat: -38.0055, lng: -57.5426 }), []);

    const selected = useMemo(
        () => markers.find((m) => m.idStr === selectedIdStr),
        [markers, selectedIdStr]
    );

    // ✅ Fit bounds para que se vean todos los pines
    const fitMapToMarkers = useCallback(() => {
        if (!mapRef.current) return;
        if (!window.google?.maps) return;
        if (markers.length === 0) return;

        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach((m) => bounds.extend({ lat: m.lat, lng: m.lng }));
        mapRef.current.fitBounds(bounds);

        // Si hay 1 solo marker, acercamos un poco
        if (markers.length === 1) {
            mapRef.current.setZoom(14);
            mapRef.current.panTo({ lat: markers[0].lat, lng: markers[0].lng });
        }
    }, [markers]);

    useEffect(() => {
        fitMapToMarkers();
    }, [fitMapToMarkers, mapLoadedTick]);

    // Hover en lista => resalta y centra en mapa
    useEffect(() => {
        if (!mapRef.current || !hoveredIdStr) return;
        const hovered = markers.find((m) => m.idStr === hoveredIdStr);
        if (!hovered) return;

        mapRef.current.panTo({ lat: hovered.lat, lng: hovered.lng });

        const currentZoom = mapRef.current.getZoom?.() || 0;
        if (currentZoom < 14) mapRef.current.setZoom(14);
    }, [hoveredIdStr, markers]);

    // ✅ debug: contá markers en consola
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
            console.log("[PropertiesMap] items:", items?.length || 0, "markers:", markers.length);
            if (items?.length && markers.length === 0) {
                console.log("[PropertiesMap] No hay coordenadas válidas. Ejemplo item:", items[0]);
            }
        }
    }, [items, markers]);

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={selected ? { lat: selected.lat, lng: selected.lng } : fallbackCenter}
            zoom={12}
            onLoad={(map) => {
                mapRef.current = map;
                // fuerza un recálculo de layout y bounds al volver desde otra ruta
                setTimeout(() => {
                    if (window.google?.maps && mapRef.current) {
                        window.google.maps.event.trigger(mapRef.current, "resize");
                    }
                    fitMapToMarkers();
                    setMapLoadedTick((v) => v + 1);
                }, 0);
            }}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                clickableIcons: false,
            }}
        >
            {markers.map((p) => (
                <Marker
                    key={p.idStr}
                    position={{ lat: p.lat, lng: p.lng }}
                    onClick={() => onSelect?.(p.idStr)}
                    icon={p.idStr === hoveredIdStr ? hoveredIcon : normalIcon}
                />
            ))}

            {selected && (
                <InfoWindow
                    position={{ lat: selected.lat, lng: selected.lng }}
                    onCloseClick={() => onSelect?.(null)}
                >
                    <div style={{ maxWidth: 240 }}>
                        <div style={{ fontWeight: 800, marginBottom: 6 }}>
                            {selected.tituloPublicacion}
                        </div>
                        <div style={{ opacity: 0.75, fontSize: 13 }}>
                            {selected.direccionF}
                        </div>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}
