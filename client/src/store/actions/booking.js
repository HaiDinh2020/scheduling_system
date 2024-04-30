import { apiGetAllBooking, apiGetBookingStatus, apiUpdateBookingStatus } from "../../services/Garage/booking";
import { actionTypes } from "./actionTypes";
import { toast } from 'react-toastify';

export const getAllBooking = (garageId) => async (dispatch) => {
    try {
        const response = await apiGetAllBooking(garageId)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ALL_BOOKING_GARAGE,
                data: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_ALL_BOOKING_GARAGE,
                data: []
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_BOOKING_GARAGE,
            data: []
        })
    }
}

export const getBookingStatus = (garageId, status) => async (dispatch) => {
    try {
        const response = await apiGetBookingStatus(garageId, status)
        if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ALL_BOOKING_GARAGE,
                data: response.data.response
            }) 
        } else {
            dispatch({
                type: actionTypes.GET_ALL_BOOKING_GARAGE,
                data: []
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_BOOKING_GARAGE,
            data: []
        })
    }
}

export const updateBookingStatus = (bookingId, newStatus) => async (dispatch) => {
    try {
        const response = await apiUpdateBookingStatus(bookingId, newStatus)
        console.log(10, response?.data.err)
        if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_BOOKING_STATUS,
                data: {
                    err: 0,
                    bookingId,
                    newStatus
                }
            }) 
            toast("update successfully")
        } else {
            dispatch({
                type: actionTypes.UPDATE_BOOKING_STATUS,
                data: {
                    err: response?.data.err || -1,
                    errorMessage: response?.data.message || "Update Fail!"
                }
            })
            toast("Update Fail!")
        }  
    } catch (error) {
        console.log(error)
        dispatch({
            type: actionTypes.GET_ALL_BOOKING_GARAGE,
            data: {
                err: -1,
                errorMessage: "Update Fail!"
            }
        })
        toast("Server Error!")
    }
}
