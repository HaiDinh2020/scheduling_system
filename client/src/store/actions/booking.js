import { apiCreateBooking, apiGetAllBooking, apiGetAllBookingCustomer, apiGetBookingStatus, apiUpdateBookingGarage, apiUpdateBookingStatus } from "../../services/Garage/booking";
import { actionTypes } from "./actionTypes";
import { toast } from 'react-toastify';

export const createBooking = (payload) => async (dispatch) => {
    try {
        const response = await apiCreateBooking(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_BOOKING,
                data: response?.data.response
            })
            toast(response?.data.msg || "Create successfully", { type: 'success' })
            return response?.data.response
        } else {
            dispatch({
                type: actionTypes.CREATE_BOOKING,
                data: [],
                msg: response?.data.msg
            })
            toast(response?.data.msg || "Create booking fail", { type: 'error' })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: actionTypes.CREATE_BOOKING,
            msg: "Create booking fail!"
        })
        toast("Server Error!")
    }
}

export const getAllBookingCustomer = () => async (dispatch) => {
    try {
        const response = await apiGetAllBookingCustomer();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ALL_BOOKING_CUSTOMER,
                data: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_ALL_BOOKING_CUSTOMER,
                data: []
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_BOOKING_CUSTOMER,
            data: []
        })
    }
}

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

export const updateBookingStatus = (bookingId, newStatus) => async (dispatch) => {
    try {
        const response = await apiUpdateBookingStatus(bookingId, newStatus)
        if (response?.data.err === 0) {
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

export const updateBookingGarage =  (garageId, bookingId) => async (dispatch) => {
    try {
        const response = await apiUpdateBookingGarage(garageId, bookingId)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.DELETE_GARAGE_BOOKING,
                data: {
                    bookingId
                }
            })
            toast(response?.data?.msg)
        } else {
            dispatch({
                type: actionTypes.DELETE_GARAGE_BOOKING,
                data: {
                    bookingId
                }
            })
        }
    } catch (error) {
        console.log(error)
        toast("Server Error!")
    }
}


export const addBooking = (bookingRequest) => async (dispatch) => {
    dispatch({
        type: actionTypes.ADD_GARAGE_BOOKING,
        data: bookingRequest
    })
}
