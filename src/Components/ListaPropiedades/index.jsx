import React from 'react';
import Card from '../Card';
import NoHayProps from '../NoHayProps';
import Paginacion from '../../Components/Paginacion';
import './styles.css';

function ListaPropiedades({
    allProps, vista,  currentPage, onPageChange, 
    totalPropiedades, propiedadesPorPagina,
}) {
    return (
        <div className='contGralListaP'>
            <div className='contListaP'>
                {
                    allProps && allProps.length > 0 ? (
                        allProps.map(p => (
                            <div
                                className='cont-card-listaProps'
                                key={p.id}
                                itemScope
                                itemType="https://schema.org/SingleFamilyResidence"
                            >
                                {/* Datos estructurados para SEO */}
                                <meta itemProp="name" content={p.tituloPublicacion} />
                                <meta itemProp="description" content={`${p.tipo} en ${p.operacion}. ${p.ambientes} ambientes, ${p.dormitorios} dormitorios, ${p.cantCocheras || 0} cocheras. Superficie total ${p.supTotal} ${p.unidadMedida}.`} />

                                {/* Imagen principal */}
                                {p.imagenes && p.imagenes[0] && (
                                    <meta itemProp="image" content={p.imagenes[0]} />
                                )}

                                {/* Dirección */}
                                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                    <meta itemProp="streetAddress" content={p.direccionF || ''} />
                                    {/* Si tenés ciudad y provincia, las podés agregar aquí */}
                                    <meta itemProp="addressLocality" content="Mar del Plata" />
                                    <meta itemProp="addressRegion" content="Buenos Aires" />
                                    <meta itemProp="addressCountry" content="AR" />
                                </div>

                                {/* Oferta */}
                                <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                    {/* No me pasaste precio, pero si lo tenés en p.precio, lo incluyo */}
                                    {p.precio && (
                                        <>
                                            <meta itemProp="price" content={p.precio} />
                                            <meta itemProp="priceCurrency" content="USD" />
                                        </>
                                    )}
                                    <link itemProp="availability" href="https://schema.org/InStock" />
                                </div>

                                {/* URL de detalle */}
                                <meta itemProp="url" content={`/propiedad/${p.id}`} />

                                {/* Tu componente Card */}
                                <Card
                                    id={p.id}
                                    direccionF={p.direccionF}
                                    operacion={p.operacion}
                                    imagenes={p.imagenes}
                                    tituloPublicacion={p.tituloPublicacion}
                                    ambientes={p.ambientes}
                                    dormitorios={p.dormitorios}
                                    unidadMedida={p.unidadMedida}
                                    cantCocheras={p.cantCocheras}
                                    supTotal={p.supTotal}
                                    tipo={p.tipo}
                                    destacadaEnWeb={p.destacadaEnWeb}
                                    vista={vista}
                                />
                            </div>
                        ))
                    ) : (
                        <div className='no-props'>
                            <NoHayProps />
                        </div>
                    )
                }
            </div>
            {/* Paginación */}
            {
                allProps.length > 0 && (
                    <Paginacion
                        allProps={allProps}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        totalPropiedades={totalPropiedades}
                        propiedadesPorPagina={propiedadesPorPagina}
                    />
                )
            }
        </div>
    );
}

export default ListaPropiedades;
