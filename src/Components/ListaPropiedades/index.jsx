import React, { useMemo } from 'react';
import Card from '../Card';
import NoHayProps from '../NoHayProps';
import './styles.css';

function ListaPropiedades({
    allProps = [],
    vista,
    propiedadesPorPagina = 12,
    variant = "page",        // "home" | "page"
    hoveredId,
    setHoveredId
}) {
    const propsToRender = useMemo(() => {
        if (!Array.isArray(allProps) || allProps.length === 0) return [];
        if (variant === "home") return allProps.slice(0, propiedadesPorPagina);
        return allProps;
    }, [allProps, variant, propiedadesPorPagina]);


    return (
        <div className='contGralListaP'>
            <div className='contListaP'>
                {propsToRender.length > 0 ? (
                    propsToRender.map((p, idx) => {
                        const id = String(p?.id ?? idx); 
                        const titulo = p?.tituloPublicacion ?? "";
                        const direccion = p?.direccionF ?? "";

                        // imagen meta (si existe)
                        const metaImg =
                            Array.isArray(p?.imagenes) && p.imagenes.length > 0
                                ? (p.imagenes[0]?.original || p.imagenes[0]?.url || p.imagenes[0])
                                : null;

                        return (
                            <div
                                className={`cont-card-listaProps ${hoveredId === id ? "is-hovered" : ""}`}
                                key={id}
                                itemScope
                                itemType="https://schema.org/SingleFamilyResidence"
                                onMouseEnter={() => setHoveredId?.(id)}   // ✅ usar id
                                onMouseLeave={() => setHoveredId?.(null)}
                            >
                                {/* Datos estructurados para SEO */}
                                <meta itemProp="name" content={titulo} />
                                <meta
                                    itemProp="description"
                                    content={`${p?.tipo ?? ""} en ${p?.operacion ?? ""}. ${p?.ambientes ?? ""} ambientes, ${p?.dormitorios ?? ""} dormitorios, ${(p?.cantCocheras ?? 0)} cocheras. Superficie total ${p?.supTotal ?? ""} ${p?.unidadMedida ?? ""}.`}
                                />

                                {metaImg && <meta itemProp="image" content={metaImg} />}

                                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                    <meta itemProp="streetAddress" content={direccion} />
                                    <meta itemProp="addressLocality" content="Mar del Plata" />
                                    <meta itemProp="addressRegion" content="Buenos Aires" />
                                    <meta itemProp="addressCountry" content="AR" />
                                </div>

                                <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                    {p?.precio && (
                                        <>
                                            <meta itemProp="price" content={p.precio} />
                                            <meta itemProp="priceCurrency" content="USD" />
                                        </>
                                    )}
                                    <link itemProp="availability" href="https://schema.org/InStock" />
                                </div>

                                <meta itemProp="url" content={`/propiedad/${id}`} />

                                {/* Card */}
                                <Card
                                    id={id}
                                    direccionF={direccion}
                                    operacion={p?.operacion}
                                    imagenes={p?.imagenes}
                                    tituloPublicacion={titulo}
                                    ambientes={p?.ambientes}
                                    dormitorios={p?.dormitorios}
                                    unidadMedida={p?.unidadMedida}
                                    cantCocheras={p?.cantCocheras}
                                    supTotal={p?.supTotal}
                                    tipo={p?.tipo}
                                    destacadaEnWeb={p?.destacadaEnWeb}
                                    vista={vista}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div className='no-props'>
                        <NoHayProps />
                    </div>
                )}
            </div>

        </div>
    );
}

export default ListaPropiedades;
