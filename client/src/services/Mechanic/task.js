import axiosConfig from "../../axiosConfig";

export const apiGetTasksOfMechanic = (mechanicId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/task/mechanic/${mechanicId}`
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiMechanicUpdateTask = (taskId, dataUpdate) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/task/mechanic/${taskId}`,
            data: dataUpdate
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})