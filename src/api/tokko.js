import axios from "axios";

const API_KEY = process.env.REACT_APP_TOKKO_API_KEY || "1fa6028de7df18808d1d4c40f7e48e51f79d31a3";
const PROPERTIES_URL = process.env.REACT_APP_TOKKO_PROPERTIES_URL || "https://www.tokkobroker.com/api/v1/property/?lang=es_ar&format=json";
const DEVELOPMENTS_URL = process.env.REACT_APP_TOKKO_DEVELOPMENTS_URL || "https://www.tokkobroker.com/api/v1/development?lang=es_ar&format=json";

const PROPERTY_DETAIL_URL = "https://www.tokkobroker.com/api/v1/property";
const DEVELOPMENT_DETAIL_URL = "https://www.tokkobroker.com/api/v1/development";
const FETCH_LIMIT = 20;
const MAX_PAGES = 200;

const splitCsv = (value) => {
    if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
    if (!value) return [];
    return String(value).split(",").map((item) => item.trim()).filter(Boolean);
};

const normalizaMetrosCuadrados = (metros) => {
    if (metros === null || metros === undefined) return "";
    return String(metros).split(".")[0];
};

const assertConfig = () => {
    if (!API_KEY || !PROPERTIES_URL || !DEVELOPMENTS_URL) {
        throw new Error("Faltan variables REACT_APP_TOKKO_* en el .env del front.");
    }
};

const withTokkoParams = (baseUrl, params = {}) => {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            url.searchParams.set(key, value);
        }
    });
    url.searchParams.set("key", API_KEY);
    return url.toString();
};

export const normalizaPropiedad = (p = {}, useRealAddress = false) => ({
    id: p.id,
    codigoReferencia: p.reference_code,
    tituloPublicacion: p.publication_title,
    direccion: useRealAddress ? p.real_address : p.address,
    direccionF: p.fake_address,
    descripcion: p.description,
    disposicion: p.disposition,
    expensas: p.expenses,
    geoLat: p.geo_lat,
    geoLong: p.geo_long,
    cantPisos: p.floors_amount,
    rentaTemporaria: p.has_temporary_rent,
    destacadaEnWeb: p.is_starred_on_web,
    ubicacion: {
        id: p.location?.id,
        ubicacion: p.location?.full_location,
        barrio: p.location?.name,
        nombre: p.location?.name,
    },
    operacion: (p.operations || []).map((item) => ({
        operacion_id: item.operation_id,
        operacion: item.operation_type,
        precios: (item.prices || []).map((price) => ({
            moneda: price.currency,
            precio: price.price,
        })),
    })),
    imagenes: (p.photos || []).map((photo) => ({
        esPortada: photo.is_front_cover,
        orden: photo.order,
        original: photo.original,
        pequeña: photo.thumb,
        url: photo.original,
    })),
    productor: {
        tel: p.producer?.cellphone,
        email: p.producer?.email,
        nombre: p.producer?.name,
        foto: p.producer?.picture,
    },
    ambientes: p.room_amount,
    dormitorios: p.suite_amount,
    baños: p.bathroom_amount,
    supCubierta: normalizaMetrosCuadrados(p.roofed_surface),
    supSemiCub: normalizaMetrosCuadrados(p.semiroofed_surface),
    supDescubierta: normalizaMetrosCuadrados(p.unroofed_surface),
    supTotal: normalizaMetrosCuadrados(p.total_surface),
    supÑote: p.surface,
    unidadMedida: p.surface_measurement,
    tipo: {
        codigo: p.type?.code,
        id: p.type?.id,
        nombre: p.type?.name,
    },
    servicios: (p.tags || []).map((tag) => ({
        id: tag.id,
        nombre: tag.name,
        tipo: tag.type,
    })),
    situacion: p.situation,
    estado: p.property_condition,
    antiguedad: p.age,
    cantCocheras: p.parking_lot_amount,
    restriccion: p.zonification,
    videos: p.videos || [],
});

export const normalizaProps = (propiedades = []) =>
    propiedades.map((propiedad) => normalizaPropiedad(propiedad, true));

export const normalizaEmprendimiento = (emp = {}) => ({
    id: emp.id,
    fechaEntrega: emp.construction_date,
    tituloPublicacion: emp.publication_title,
    direccionF: emp.fake_address,
    geoLat: emp.geo_lat,
    geoLong: emp.geo_long,
    geo_lat: emp.geo_lat,
    geo_long: emp.geo_long,
    locacion: emp.location?.full_location,
    ubicacion: {
        id: emp.location?.id,
        ubicacion: emp.location?.full_location,
        nombre: emp.location?.name,
        barrio: emp.location?.name,
    },
    descripcion: emp.description,
    imagenes: (emp.photos || []).map((photo) => ({
        imagen: photo.image,
        imagenChica: photo.thumb,
        original: photo.image,
    })),
    servicios: (emp.tags || []).map((tag) => tag.name),
    tipoProp: emp.type?.name,
    video: emp.videos || [],
    videos: emp.videos || [],
});

export const normalizaEmprendimientos = (emprendimientos = []) =>
    emprendimientos.map(normalizaEmprendimiento);

const getAllProperties = async () => {
    assertConfig();

    let propiedades = [];
    let currentOffset = 0;
    let fetchedCount = 0;
    let pages = 0;

    do {
        pages += 1;
        if (pages > MAX_PAGES) {
            throw new Error("MAX_PAGES alcanzado al consultar propiedades Tokko.");
        }

        const resp = await axios.get(withTokkoParams(PROPERTIES_URL, {
            limit: FETCH_LIMIT,
            offset: currentOffset,
        }));
        const objects = Array.isArray(resp?.data?.objects) ? resp.data.objects : [];
        const normalized = normalizaProps(objects);

        propiedades = propiedades.concat(normalized);
        fetchedCount = normalized.length;
        currentOffset += FETCH_LIMIT;
    } while (fetchedCount === FETCH_LIMIT);

    return propiedades;
};

const filtraPropiedades = (propiedades, filtros = {}) => {
    let result = Array.isArray(propiedades) ? [...propiedades] : [];
    const {
        operacion,
        tipo,
        tipoPropiedad,
        barrios,
        barrio,
        precioMin,
        precioMax,
        ambientes,
        destacadas,
    } = filtros;

    if (operacion && operacion !== "Todas") {
        result = result.filter((p) =>
            Array.isArray(p?.operacion) && p.operacion.some((item) => item?.operacion === operacion)
        );
    }

    const tipos = splitCsv(tipoPropiedad || tipo);
    if (tipos.length) {
        result = result.filter((p) => tipos.includes(p?.tipo?.nombre));
    }

    const barriosArray = splitCsv(barrios || barrio);
    if (barriosArray.length) {
        result = result.filter((p) => barriosArray.includes(p?.ubicacion?.barrio));
    }

    if (precioMin || precioMax) {
        const precioMinNum = precioMin ? Number(precioMin) : 0;
        const precioMaxNum = precioMax ? Number(precioMax) : Infinity;

        result = result.filter((p) =>
            Array.isArray(p?.operacion) &&
            p.operacion.some((item) =>
                Array.isArray(item?.precios) &&
                item.precios.some((precio) => {
                    const precioValor = Number(precio?.precio);
                    return precioValor >= precioMinNum && precioValor <= precioMaxNum;
                })
            )
        );
    }

    if (ambientes && ambientes !== "mas") {
        result = result.filter((p) => Number(p?.ambientes) === Number(ambientes));
    }
    if (ambientes === "mas") {
        result = result.filter((p) => Number(p?.ambientes) >= 5);
    }

    if (destacadas) {
        result = result.filter((p) => p?.destacadaEnWeb === true);
    }

    const destacadasPrimero = result.filter((p) => p?.destacadaEnWeb === true);
    const noDestacadas = result.filter((p) => p?.destacadaEnWeb !== true);
    return destacadasPrimero.concat(noDestacadas);
};

export const fetchProperties = async (filtros = {}) => {
    const limit = Number(filtros.limit ?? 12);
    const offset = Number(filtros.offset ?? 0);
    const propiedades = filtraPropiedades(await getAllProperties(), filtros);

    return {
        total: propiedades.length,
        propiedades: propiedades.slice(offset, offset + limit),
    };
};

export const fetchPropertiesMap = async (filtros = {}) => {
    const propiedades = filtraPropiedades(await getAllProperties(), filtros)
        .filter((p) => p.geoLat && p.geoLong);

    return {
        total: propiedades.length,
        propiedades,
    };
};

export const fetchFeaturedProperties = async () => {
    const propsDestacadas = filtraPropiedades(await getAllProperties(), { destacadas: true });
    return {
        total: propsDestacadas.length,
        propsDestacadas,
    };
};

export const fetchProperty = async (id) => {
    assertConfig();
    const resp = await axios.get(withTokkoParams(`${PROPERTY_DETAIL_URL}/${id}`, {
        lang: "es_ar",
        format: "json",
    }));
    return normalizaPropiedad(resp.data, false);
};

export const fetchDevelopments = async () => {
    assertConfig();
    const resp = await axios.get(withTokkoParams(DEVELOPMENTS_URL, {
        limit: 10,
        offset: 0,
    }));
    const empNormalizados = normalizaEmprendimientos(resp?.data?.objects || []);

    return {
        empNormalizados,
        totEmp: empNormalizados.length,
    };
};

export const fetchDevelopment = async (id) => {
    assertConfig();
    const resp = await axios.get(withTokkoParams(`${DEVELOPMENT_DETAIL_URL}/${id}/`, {
        lang: "es_ar",
        format: "json",
    }));
    return normalizaEmprendimiento(resp.data);
};
