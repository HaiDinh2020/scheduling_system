import axiosConfig from "../../axiosConfig";

// payload dạng { mechanic_id, title, description, startTime, endTime }
export const apiCreateAppointment = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url:'/api/v1/appointment',
            data: payload
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAppointment = (mechanic_id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url:`/api/v1/appointment/${mechanic_id}`,
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiChangeStatusAppointment = (appointmentId, status) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url:`/api/v1/appointment/status/${appointmentId}`,
            data: {status: status}
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateAppointment = (appointmentId, dataUpdate) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url:`/api/v1/appointment/${appointmentId}`,
            data: dataUpdate
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteAppointment = (appointmentId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url:`/api/v1/appointment/${appointmentId}`,
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})