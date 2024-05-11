import { actionTypes } from "../actions/actionTypes";

const initState = {
    post: [],
    newPost: []
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_POST:
            return {
                ...state,
                post: action.data || []
            }
        case actionTypes.GET_NEW_POST:
            return {
                ...state,
                newPost: action.data || []
            }
            
        
        default:
            return state;
    }
}

export default postReducer;