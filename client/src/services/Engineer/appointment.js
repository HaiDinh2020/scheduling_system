import axiosConfig from "../../axiosConfig";

// payload dạng { engineer_id, title, description, startTime, endTime }
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

export const apiGetAppointment = (engineer_id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url:`/api/v1/appointment/${engineer_id}`,
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})