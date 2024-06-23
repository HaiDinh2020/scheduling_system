import axiosConfig from "../../axiosConfig";

export const apiCreateMaintenanceSchedule = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url:'/api/v1/maintenance',
            data: payload
        })

        if (response.status === 200) {
            resolve(response); 
        } else if (response.status === 400) {
            reject(new Error(response?.data?.msg));
        }
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateMaintenanceSchedule = (maintenanceId, payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url:`/api/v1/maintenance/${maintenanceId}`,
            data: payload
        })

        if (response.status === 200) {
            resolve(response); 
        } else if (response.status === 400) {
            reject(new Error(response?.data?.msg));
        }
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteMaintenanceSchedule = (maintenanceId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url:`/api/v1/maintenance/${maintenanceId}`,
        })

        if (response.status === 200) {
            resolve(response); 
        } else if (response.status === 400) {
            reject(new Error(response?.data?.msg));
        }
    } catch (error) {
        reject(error)
    }
})
