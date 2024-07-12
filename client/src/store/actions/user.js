import { apiGetCurrentProfile, apiUpdateProfile } from "../../services/user";
import { actionTypes } from "./actionTypes";
import { toast } from 'react-toastify';

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const response = await apiGetCurrentProfile()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CURRENT_PROFILE,
                data: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CURRENT_PROFILE,
                data: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT_PROFILE,
            data: null
        })
    }
}

export const updateProfile = (payload) => async (dispatch) => {
    try {
        const response = await apiUpdateProfile(payload)
        if (response?.data.err === 0) {
            toast("update profile successfully")
            dispatch({
                type: actionTypes.UPDATE_PROFILE,
                data: payload
            })
        } else {
            toast(response?.data?.msg)
            // dispatch({
            //     type: actionTypes.UPDATE_PROFILE,
            //     data: response.data.msg
            // })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_PROFILE,
            data: null
        })
    }
}