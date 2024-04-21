import { apiGetGarageInfor, apiUpdateGarageInfor } from "../../services/Garage/garage";
import { actionTypes } from "./actionTypes";
import { toast } from 'react-toastify';

export const getGarageInfor = () => async (dispatch) => {
    try {
        const response = await apiGetGarageInfor()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_GARAGE_INFOR,
                data: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_GARAGE_INFOR,
                data: {}
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_GARAGE_INFOR,
            data: {}
        })
    }
}

export const updateGarageInfor = () => async (dispatch) => {
    try {
        const response = await apiUpdateGarageInfor()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_GARAGE_INFOR,
                data: response.data.response
            })
            toast(response.data.msg)
        } else {
            dispatch({
                type: actionTypes.GET_GARAGE_INFOR,
                data: {}
            })
            toast(response?.data.msg)
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_GARAGE_INFOR,
            data: {}
        })
        toast(error)
        console.log(error)
    }
}