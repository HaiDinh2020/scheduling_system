import axiosConfig from "../../axiosConfig";

export const apiGetAllMechanic = (garageId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url:`/api/v1/mechanic/${garageId}`
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAvailableMechanic = (garageId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url:`/api/v1/mechanic/available/${garageId}`
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})