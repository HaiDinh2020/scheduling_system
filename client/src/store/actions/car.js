import { toast } from 'react-toastify';
import { actionTypes } from "./actionTypes";
import { apiCreateCar, apiDeleteCar, apiGetAllCar } from "../../services/Customer/car";


export const createCar = (payload) => async (dispatch) => {
    try {
        const response = await apiCreateCar(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_CAR,
                data: response?.data.response
            })
            toast("Create car successfully", {type: 'success', autoClose: 5000})
        } else {
            dispatch({
                type: actionTypes.GET_POST,
                data: []
            })
            toast(response?.data.msg || "Có lỗi xảy ra", {type: 'error'})
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_CAR,
            data: []
        })
        toast("Có lỗi xảy ra", {type: 'error'})
    }
}

export const getAllCar = () => async (dispatch) => {
    try {
        const response = await apiGetAllCar()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CARS,
                data: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CARS,
                data: []
            })
            toast(response?.data.msg || "Có lỗi xảy ra", {type: 'error'})
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CARS,
            data: []
        })
        toast("Có lỗi xảy ra", {type: 'error'})
    }
}

export const deleteCar = (carId) => async (dispatch) => {
    try {
        const response = await apiDeleteCar(carId)
        if(response?.data.err === 0) {
            dispatch({
                type: actionTypes.DELETE_CAR,
                data: carId
            })
            toast(response?.data.msg || "Xóa thành công", {type: 'success'})
        } else {
            dispatch({
                type: actionTypes.DELETE_CAR,
                data: null
            })
            toast(response?.data.msg || "Có lỗi xảy ra", {type: 'error'})
        }
    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_CAR,
            data: null
        })
        toast("Có lỗi xảy ra " + error, {type: 'error'})
    }
}
