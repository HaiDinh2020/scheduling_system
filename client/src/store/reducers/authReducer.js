import { actionTypes } from "../actions/actionTypes";

const initState = {
    isLoggedIn: true,
    token: 111,
    msg:'',
    update: false,
    role: "customer"
}

const authReducer = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data.token,
                msg: "",
                role: action.data.role
            }
        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                msg: action.data,
                token: null,
                update: !state.update,
                role: ""
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: "",
                role: ""
            }

        default:
            return state;
    }
}

export default authReducer;