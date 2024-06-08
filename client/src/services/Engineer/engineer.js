import axiosConfig from "../../axiosConfig";

export const apiGetAllEngineer = (garageId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url:`/api/v1/engineer/${garageId}`
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAvailableEngineer = (garageId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url:`/api/v1/engineer/available/${garageId}`
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})