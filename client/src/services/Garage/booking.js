
import axiosConfig from "../../axiosConfig";

export const apiCreateBooking = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url:'/api/v1/booking/customer',
            data: payload
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAllBookingCustomer = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url:`/api/v1/booking/customer`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAllBooking = (garageId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/booking/garage/${garageId}`,
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

export const apiUpdateBookingGarage = (garageId, bookingId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/booking/garage/${garageId}/${bookingId}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})