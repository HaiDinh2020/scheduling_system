import { actionTypes } from "../actions/actionTypes";

const initState = {
    garageBookingData: [],
    customerBookingData: []
}

const bookingReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_BOOKING_GARAGE:
            return {
                ...state,
                garageBookingData: action.data || []
            }

        case actionTypes.UPDATE_BOOKING_STATUS:
            if (action.data.err === 0) {
                const { bookingId, newStatus } = action.data;
                const updatedBookings = state.garageBookingData?.map(booking => {
                    if (booking.id === bookingId) {
                        return { ...booking, status: newStatus };
                    }
                    return booking;
                });
                return {
                    ...state,
                    garageBookingData: updatedBookings
                }
            } else {
                return {
                    ...state,
                }
            }
        
        case actionTypes.CREATE_BOOKING: 
            if(action.data) {
                const newCustomerBookingData = [...state.customerBookingData, action.data]
                return {
                    ...state,
                    customerBookingData: newCustomerBookingData
                }
            } else {
                return {
                    ...state
                }
            }
        case actionTypes.GET_ALL_BOOKING_CUSTOMER: 
            return {
                ...state,
                customerBookingData: action.data || []
            }
        
        case actionTypes.LOGOUT:
            return {
                ...state,
                garageBookingData: [],
                customerBookingData: []
            }
        default:
            return state;
    }
}

export default bookingReducer;