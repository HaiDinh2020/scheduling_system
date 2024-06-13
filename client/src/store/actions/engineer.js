import { actionTypes } from "./actionTypes";
import {apiGetAllEngineer } from "../../services/Engineer/engineer";

export const getAllEngineer = (garageId) => async (dispatch) => {
    try {
        const response = await apiGetAllEngineer(garageId)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ENGINEERS,
                data: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_ENGINEERS,
                data: []
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ENGINEERS,
            data: []
        })
    }
}