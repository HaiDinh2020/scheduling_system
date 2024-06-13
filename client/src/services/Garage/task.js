import axiosConfig from "../../axiosConfig";

export const apiCreateTask = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/task',
            data: payload
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetTasksOfGarage = (garageId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/task/${garageId}`
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateTask = (taskId, dataUpdate) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/task/${taskId}`,
            data: dataUpdate
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})