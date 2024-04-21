import { actionTypes } from "../actions/actionTypes";

const initState = {
    garageInfor: {}
}

const garageReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_GARAGE_INFOR:
            return {
                ...state,
                garageInfor: action.data || {}
            }
        case actionTypes.UPDATE_GARAGE_INFOR:
            return {
                ...state,
                garageInfor: action.data || {}
            }
            
        case actionTypes.LOGOUT:
            return {
                ...state,
                garageInfor: {}
            }
        default:
            return state;
    }
}

export default garageReducer;