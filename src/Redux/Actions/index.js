import axios from "axios";
import {  GET_PROPERTY,  GET_PROPS, IS_OPEN_MODAL_PICTURE, LOADING, RESET_PROPS, GET_PROPS_MAP,
    RESET_PROPERTY, GET_EMPRENDIMIENTOS, GET_EMPRENDIMIENTO, RESET_EMPRENDIMIENTO,
    GET_PROPS_DESTACADAS, 
} from "./actionsType";
import { actual } from "../../url";


//--actions para props-------------------------------------------------------------
export const getPropsMap = (limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas) => {
    return async function (dispatch) {
        
        try {
            //construimos los parametros dinamicamente
            let queryParams = `?limit=${limit}&offset=${offset}`;

            if(operacion) queryParams += `&operacion=${operacion}`;
            if(tipoPropiedad) queryParams += `&tipo=${tipoPropiedad}`;
            if(ambientes) queryParams += `&ambientes=${ambientes}`;
            if(precioMin) queryParams += `&precioMin=${precioMin}`;
            if(precioMax) queryParams += `&precioMax=${precioMax}`;
            if(destacadas) queryParams += `&destacadas=${destacadas}`;
            //if(internacional) queryParams += `&internacional=${internacional}`;

            const resp = await axios.get(`${actual}/propiedades/propsMap${queryParams}`); 
            dispatch({type: GET_PROPS_MAP, payload: resp.data});
        } catch (error) {
            console.log(error);
        }
    }
}
//trae props
export const getProps = (limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas) => {
    return async function(dispatch) {
        dispatch({type: LOADING});

        try {
            //construimos los parametros dinamicamente
            let queryParams = `?limit=${limit}&offset=${offset}`;

            if(operacion) queryParams += `&operacion=${operacion}`;
            if(tipoPropiedad) queryParams += `&tipo=${tipoPropiedad}`;
            if(ambientes) queryParams += `&ambientes=${ambientes}`;
            if(precioMin) queryParams += `&precioMin=${precioMin}`;
            if(precioMax) queryParams += `&precioMax=${precioMax}`;
            if(destacadas) queryParams += `&destacadas=${destacadas}`;
            //if(internacional) queryParams += `&internacional=${internacional}`;

            const resp = await axios.get(`${actual}/propiedades/propiedades${queryParams}`); 
            dispatch({ type: GET_PROPS, payload: resp.data });
        } catch (error) {
            console.log(error);
        }
    }
}

//trae props destacadas
export const getPropsDestacadas = () => {
    return async function(dispatch) {
        dispatch({type: LOADING});

        try {
            //construimos los parametros dinamicamente            
            const resp = await axios.get(`${actual}/propiedades/propsDestacadas`); 
            dispatch({ type: GET_PROPS_DESTACADAS, payload: resp.data });
        } catch (error) {
            console.log(error);
        }
    }
}

//trae prop por id
export const getProperty = (id) => {
    return async function(dispatch) {
        dispatch({type: LOADING});
        
        try {
            const resp = await axios.get(`${actual}/propiedades/${id}`);
            dispatch({type: GET_PROPERTY, payload: resp.data});
        } catch (error) {
            console.log(error);
        }
    }
};

//reset detalle
export const resetProperty = () => {
    return function(dispatch) {
        dispatch({ type: RESET_PROPERTY });
    }
};

//cierra Modal imagen prop
export const isOpenModalPicture = () => {
    return function(dispatch){
        dispatch({type: IS_OPEN_MODAL_PICTURE});
    }
};

//reset propiedades
export const resetPropiedades = () => {
    return function(dispatch){
        dispatch({type: RESET_PROPS});
    }
}

//elimina propiedad
export const eliminaProp = (_id) => {
    return async function() {
        await axios.delete(`${actual}/propiedades/eliminaProp/${_id}`);
    }
};

//edita propiedad
export const editaProp = (data) => {
    return async function() {
        await axios.put(`${actual}/propiedades/editaProp`, data);
    }
};

//--EMPRENDIMIENTOS------------------------------
//trae emprendimientos
export const getEmprendimientos = (tipo) => {
    return async function(dispatch) {
        dispatch({type: LOADING});

        try {
            const resp = await axios.get(`${actual}/emprendimientos`); 
            dispatch({type: GET_EMPRENDIMIENTOS, payload: resp.data});
        } catch (error) {
            console.log(error);
        }
    }
}

//trae emprendimiento por ID
export const getEmprendimiento = (id) => { 
    return async function(dispatch) {
        dispatch({type: LOADING});
        const resp = await axios.get(`${actual}/emprendimientos/${id}`);
        dispatch({type: GET_EMPRENDIMIENTO, payload: resp.data});
    }
}

//reset emprendimientos
export const resetEmprendimientos = () => {
    return function(dispatch){
        dispatch({type: RESET_EMPRENDIMIENTO});
    }
}

//--botón me gusta------------------------------------
export const sumoMeGusta = (id) => { 
    return async function(){
        await axios.post(`${actual}/meGusta/suma`, {id});
    }
};

export const restaMeGusta = (id) => {
    return async function () {
        await axios.put(`${actual}/meGusta/resta`, {id});
    }
}