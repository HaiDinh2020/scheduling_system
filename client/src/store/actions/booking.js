import { message } from "antd";
import { apiCancelBooking, apiCreateBookingMaintenance } from "../../services/Customer/booking";
import { apiCreateBooking, apiGetAllBooking, apiGetAllBookingCustomer, apiGetBookingRequest, apiGetBookingStatus, apiRespondToBooking, apiUpdateBookingStatus } from "../../services/Garage/booking";
import { actionTypes } from "./actionTypes";
import { toast } from 'react-toastify';
import { apiCreateInvoice } from "../../services/Garage/invoice";

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
        if (error.response) {
            message.error(error.response.data.msg || "Server error");
        } else if (error.request) {
            message.error("Network error");
        } else {
            message.error("Unexpected error");
        }
        dispatch({
            type: actionTypes.CREATE_BOOKING,
            msg: "Create booking fail!"
        })
    }
}

export const createBookingMaintenance = (payload) => async (dispatch) => {
    try {
        const response = await apiCreateBookingMaintenance(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_BOOKING,
                data: response?.data.response
            })
            message.success(response?.data.msg || "Create successfully")
            return response?.data.response
        } else {
            dispatch({
                type: actionTypes.CREATE_BOOKING,
                data: [],
                msg: response?.data.msg
            })
            message.error(response?.data.msg || "Create booking fail")
            return false;
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: actionTypes.CREATE_BOOKING,
            msg: "Create booking fail!"
        })
        message.error("Server Error!")
        return false;
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

export const cancelBooking = (bookingId) => async (dispatch) => {
    try {
        const response = await apiCancelBooking(bookingId)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CANCEL_BOOKING,
                data: {
                    err: 0,
                    bookingId,
                }
            })
            message.success("Hủy bỏ thành công", 2)
        } else {
            console.log(response?.data)
            message.error(response.data?.msg, 2)
        }
    } catch (error) {
        console.log(error)
    }
}

// garage

// dont use
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

export const getBookingRequest = (garageId) => async (dispatch) => {
    try {
        const response = await apiGetBookingRequest(garageId)
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

export const respondToBooking = (bookingId, bookingGarageId, status) => async (dispatch) => {
    try {
        const response = await apiRespondToBooking(bookingGarageId, status)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GARAGE_DELETE_BOOKING,
                data: {
                    bookingId
                }
            })
            toast(response?.data?.msg)
        } else {
            dispatch({
                type: actionTypes.GARAGE_DELETE_BOOKING,
                data: {
                    bookingId
                }
            })
        }
    } catch (error) {
        if (error.response) {
            message.error(error.response.data.msg || "Server error");
        } else if (error.request) {
            message.error("Network error");
        } else {
            message.error("Unexpected error");
        }
    }
}

export const garageDeleteBookingMaintenance = (bookingId) => async (dispatch) => {
    try {
        const response = await apiCancelBooking(bookingId)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GARAGE_DELETE_BOOKING,
                data: {
                    bookingId
                }
            })
            message.success("Hủy bỏ thành công", 2)
        } else {
            console.log(response?.data)
            message.error(response.data?.msg, 2)
        }
    } catch (error) {
        console.log(error)
        if (error.response) {
            message.error(error.response.data.msg || "Server error");
        } else if (error.request) {
            message.error("Network error");
        } else {
            message.error("Unexpected error");
        }
    }
}

export const addBooking = (bookingRequest) => async (dispatch) => {
    dispatch({
        type: actionTypes.ADD_GARAGE_BOOKING,
        data: bookingRequest
    })
}

// create invoice => update invoice in booking
export const createInvoice = (payload) => async (dispatch) => {
    try {
        const response = await apiCreateInvoice(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_INVOICE,
                data: {
                    bookingId: response?.data?.response?.booking_id,
                    invoice: response?.data?.response
                }
            })
            return response?.data?.response
        } else {
            message.error(response.data?.msg, 2)
        }
    } catch (error) {
        if (error.response) {
            message.error(error.response.data.msg || "Server error");
        } else if (error.request) {
            message.error("Network error");
        } else {
            message.error("Unexpected error");
        }
    }
}
