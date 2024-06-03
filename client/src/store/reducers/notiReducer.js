import { actionTypes } from "../actions/actionTypes";

const initState = {
    notises: []
}

const notiReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_NOTI: 
            const newNoti = [...state.notises, action.data];
            return {
                ...state,
                notises: newNoti
            }

        // case actionTypes.DELETE_NOTI: 
        //     if(action.data === null) {
        //         return state;
        //     }
        //     const filteredCars = state.cars.filter(item => item.id !== action.data);
        //     return {
        //         ...state,
        //         cars: filteredCars
        //     }
        case actionTypes.LOGOUT:
            return {
                ...state,
                notises: []
            }
            
        
        default:
            return state;
    }
}

export default notiReducer;