import { toast } from 'react-toastify';
import { actionTypes } from "./actionTypes";
import { apiGetAllGarage } from "../../services/Customer/customer";

export const getAllGarage = () => async (dispatch) => {
    try {
        const response = await apiGetAllGarage()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POST,
                data: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_POST,
                data: []
            })
            // toast(response?.data.msg || "Có lỗi xảy ra", {type: 'error'})
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POST,
            data: []
        })
        // toast("Có lỗi xảy ra", {type: 'error'})
    }
}