import { 
    GET_PROPERTY, GET_PROPS, IS_OPEN_MODAL_PICTURE, 
    LOADING,GET_EMPRENDIMIENTO, GET_EMPRENDIMIENTOS,
    RESET_EMPRENDIMIENTO,  RESET_PROPERTY,
    RESET_PROPS, GET_PROPS_MAP,
    GET_PROPS_DESTACADAS,
} from "../Actions/actionsType";

const initialState = {
    propiedades: [],
    propsMap: [],
    propsDestacadas: [],
    totPropiedades: 0,
    propiedad: {},
    tipoOp: [],
    emprendimientos: [],
    emprendimiento: {},
    loading: true,
    isOpenModalPicture: false,
};


export default function rootReducer (state = initialState, action) {
    switch(action.type){
        case LOADING:
            return{
                ...state,
                loading: false
            };
        case GET_PROPS:
            return {
                ...state,
                loading: false,
                propiedades: action.payload.propiedades,
                totPropiedades: action.payload.total,
            };
        case GET_PROPS_DESTACADAS:
            return {
                ...state,
                loading: false,
                propsDestacadas: action.payload.propsDestacadas,
                /* totPropiedades: action.payload.total, */
            };
        case GET_PROPERTY:
            return{
                ...state,
                propiedad: action.payload,
            };
        case RESET_PROPERTY:
            return{
                ...state,
                propiedad: {}
            };
        case GET_PROPS_MAP:
            return {
                ...state,
                propsMap: action.payload,
            }
        
        case IS_OPEN_MODAL_PICTURE:
            return{
                ...state,
                isOpenModalPicture: !state.isOpenModalPicture,
            };
        case RESET_PROPS:
            return{
                ...state,
                propiedades: []
            };
        case GET_EMPRENDIMIENTOS:
            return{
                ...state,
                emprendimientos: action.payload.empNormalizados,
                loading: false
            };
        case GET_EMPRENDIMIENTO:
            return{
                ...state,
                emprendimiento: action.payload,
                loading: false
            };
        case RESET_EMPRENDIMIENTO:
            return{
                ...state,
                emprendimiento: {}
            };
        default:
            return state;
    }
};