import { actionTypes } from "../actions/actionTypes";

const initState = {
    engineers: []
}

const engineerReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ENGINEERS:
            return {
                ...state,
                engineers: action.data || []
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                engineers: []
            }
            
        
        default:
            return state;
    }
}

export default engineerReducer;