import { actionTypes } from "../actions/actionTypes";

const initState =  {
    userCurentProfile : {}
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENT_PROFILE: 
            return {
                ...state,
                userCurentProfile: action.data || {}
            }
        case actionTypes.LOGOUT: 
            return {
                ...state,
                userCurentProfile: {}
            }
        case actionTypes.UPDATE_PROFILE:
            return {
                ...state,
                userCurentProfile: action.data || {}
            }
        default:
            return state;
    }
}

export default userReducer;