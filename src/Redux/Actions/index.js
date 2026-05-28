import {
    GET_PROPERTY, GET_PROPS, IS_OPEN_MODAL_PICTURE, LOADING, RESET_PROPS, GET_PROPS_MAP,
    RESET_PROPERTY, GET_EMPRENDIMIENTOS, GET_EMPRENDIMIENTO, RESET_EMPRENDIMIENTO,
    GET_PROPS_DESTACADAS,
} from "./actionsType";
import {
    fetchDevelopment,
    fetchDevelopments,
    fetchFeaturedProperties,
    fetchProperties,
    fetchPropertiesMap,
    fetchProperty,
} from "../../api/tokko";


//--actions para props-------------------------------------------------------------
export const getPropsMap = (limit, offset, operacion, tipoPropiedad, barrios, precioMin, precioMax, ambientes, destacadas) => {
    return async function (dispatch) {

        try {
            const resp = await fetchPropertiesMap({
                limit,
                offset,
                operacion,
                tipoPropiedad,
                barrios,
                precioMin,
                precioMax,
                ambientes,
                destacadas,
            });
            dispatch({ type: GET_PROPS_MAP, payload: resp });
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_PROPS_MAP, payload: { total: 0, propiedades: [] } });
        }
    }
}
//trae props
export const getProps = (limit, offset, operacion, tipoPropiedad, barrios, precioMin, precioMax, ambientes, destacadas) => {
    return async function (dispatch) {
        dispatch({ type: LOADING });

        try {
            const resp = await fetchProperties({
                limit,
                offset,
                operacion,
                tipoPropiedad,
                barrios,
                precioMin,
                precioMax,
                ambientes,
                destacadas,
            });
            dispatch({ type: GET_PROPS, payload: resp });
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_PROPS, payload: { total: 0, propiedades: [] } });
        }
    }
}

//trae props destacadas
export const getPropsDestacadas = () => {
    return async function (dispatch) {
        dispatch({ type: LOADING });

        try {
            const resp = await fetchFeaturedProperties();
            dispatch({ type: GET_PROPS_DESTACADAS, payload: resp });
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_PROPS_DESTACADAS, payload: { total: 0, propsDestacadas: [] } });
        }
    }
}

//trae prop por id
export const getProperty = (id) => {
    return async function (dispatch) {
        dispatch({ type: LOADING });

        try {
            const resp = await fetchProperty(id);
            dispatch({ type: GET_PROPERTY, payload: resp });
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_PROPERTY, payload: {} });
        }
    }
};

//reset detalle
export const resetProperty = () => {
    return function (dispatch) {
        dispatch({ type: RESET_PROPERTY });
    }
};

//cierra Modal imagen prop
export const isOpenModalPicture = () => {
    return function (dispatch) {
        dispatch({ type: IS_OPEN_MODAL_PICTURE });
    }
};

//reset propiedades
export const resetPropiedades = () => {
    return function (dispatch) {
        dispatch({ type: RESET_PROPS });
    }
}

//--EMPRENDIMIENTOS------------------------------
//trae emprendimientos
export const getEmprendimientos = (tipo) => {
    return async function (dispatch) {
        dispatch({ type: LOADING });

        try {
            const resp = await fetchDevelopments();
            dispatch({ type: GET_EMPRENDIMIENTOS, payload: resp });
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_EMPRENDIMIENTOS, payload: { empNormalizados: [], totEmp: 0 } });
        }
    }
}

//trae emprendimiento por ID
export const getEmprendimiento = (id) => {
    return async function (dispatch) {
        dispatch({ type: LOADING });
        try {
            const resp = await fetchDevelopment(id);
            dispatch({ type: GET_EMPRENDIMIENTO, payload: resp });
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_EMPRENDIMIENTO, payload: {} });
        }
    }
}

//reset emprendimientos
export const resetEmprendimientos = () => {
    return function (dispatch) {
        dispatch({ type: RESET_EMPRENDIMIENTO });
    }
}

//--botón me gusta------------------------------------
