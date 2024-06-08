import axiosConfig from '../../axiosConfig'

export const apiGetGarageHaveBeenRepaired = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/get-garage',
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetEngineerOfGarage = (garageId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/garage/${garageId}/engineers`
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiCreateBookingMaintenance = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/booking/customer/maintenance`,
            data: payload
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})