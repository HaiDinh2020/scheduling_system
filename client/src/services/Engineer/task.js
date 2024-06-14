import axiosConfig from "../../axiosConfig";

export const apiGetTasksOfEngineer = (engineerId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/task/engineer/${engineerId}`
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiEngineerUpdateTask = (taskId, dataUpdate) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/task/engineer/${taskId}`,
            data: dataUpdate
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})