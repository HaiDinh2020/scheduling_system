import axiosConfig from '../../axiosConfig'

export const apiCreateCar = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/car',
            data: payload
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAllCar = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/car'
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteCar = (carId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `api/v1/car/${carId}`
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})