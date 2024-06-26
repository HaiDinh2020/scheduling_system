import { actionTypes } from "../actions/actionTypes";

const initState = {
    mechanics: []
}

const mechanicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_MECHANICS:
            return {
                ...state,
                mechanics: action.data || []
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                mechanics: []
            }
            
        
        default:
            return state;
    }
}

export default mechanicReducer;