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

export const apiGetMechanicOfGarage = (garageId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/garage/${garageId}/mechanics`
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

export const apiCancelBooking = (bookingId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/booking/customer/${bookingId}`,
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})
