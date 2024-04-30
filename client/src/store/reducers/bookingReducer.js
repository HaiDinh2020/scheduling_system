import { actionTypes } from "../actions/actionTypes";

const initState = {
    bookingData: []
}

const bookingReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_BOOKING_GARAGE:
            return {
                ...state,
                bookingData: action.data || []
            }

        case actionTypes.UPDATE_BOOKING_STATUS:
            if (action.data.err === 0) {
                const { bookingId, newStatus } = action.data;
                const updatedBookings = state.bookingData?.map(booking => {
                    if (booking.id === bookingId) {
                        return { ...booking, status: newStatus };
                    }
                    return booking;
                });
                return {
                    ...state,
                    bookingData: updatedBookings
                }
            } else {
                return {
                    ...state,
                }
            }

        case actionTypes.LOGOUT:
            return {
                ...state,
                bookingData: []
            }
        default:
            return state;
    }
}

export default bookingReducer;