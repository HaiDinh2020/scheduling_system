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

        case actionTypes.CANCEL_BOOKING:
            if (action.data.err === 0) {
                const { bookingId } = action.data;
                const updatedBookings = state.customerBookingData?.filter(booking => booking.id !== bookingId)
                return {
                    ...state,
                    customerBookingData: updatedBookings
                }
            } else {
                return {
                    ...state,
                }
            }

        case actionTypes.GET_ALL_BOOKING_CUSTOMER:
            return {
                ...state,
                customerBookingData: action.data
            }

        case actionTypes.ADD_GARAGE_BOOKING:
            const newBookingRequest = [...state.garageBookingData, action.data]
            return {
                ...state,
                garageBookingData: newBookingRequest
            }

        case actionTypes.GARAGE_DELETE_BOOKING:
            return {
                ...state,
                garageBookingData: state.garageBookingData.filter(booking => booking.id !== action.data.bookingId)
            }
        case actionTypes.CREATE_INVOICE:
            const { bookingId, invoice } = action.data;
            const updatedBookings = state.garageBookingData?.map(booking => {
                if (booking.id === bookingId) {
                    return {
                        ...booking, invoice: {
                            id: invoice.id,
                            amount: invoice.amount,
                            status: invoice.status,
                            invoice_image: invoice.invoice_image
                        }
                    };
                }
                return booking;
            });
            return {
                ...state,
                garageBookingData: updatedBookings
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