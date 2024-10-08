
import axiosConfig from "../../axiosConfig";

export const apiPostLimit = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/booking/garage/`,
            params: query
        })
        resolve(response)
    
    } catch (error) {
        reject(error)
    }
})

export const apiGetBookingStatus = (garageId, status) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/booking/garage/${garageId}?status=${status}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateBookingStatus = (garageId, newStatus) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/booking/garage/${garageId}`,
            data: {newStatus}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})