import { actionTypes } from "../actions/actionTypes";

const initState = {
    cars: []
}

const carReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CARS:
            return {
                ...state,
                cars: action.data || []
            }
        case actionTypes.CREATE_CAR: 
            const newCars = [...state.cars, action.data];
            return {
                ...state,
                cars: newCars
            }

        case actionTypes.DELETE_CAR: 
            if(action.data === null) {
                return state;
            }
            const filteredCars = state.cars.filter(item => item.id !== action.data);
            return {
                ...state,
                cars: filteredCars
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                cars: []
            }
            
        
        default:
            return state;
    }
}

export default carReducer;