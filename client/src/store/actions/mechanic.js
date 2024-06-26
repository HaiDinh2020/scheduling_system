import { actionTypes } from "./actionTypes";
import {apiGetAllMechanic } from "../../services/Mechanic/mechanic";

export const getAllMechanic = (garageId) => async (dispatch) => {
    try {
        const response = await apiGetAllMechanic(garageId)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_MECHANICS,
                data: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_MECHANICS,
                data: []
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_MECHANICS,
            data: []
        })
    }
}