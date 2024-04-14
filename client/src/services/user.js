import axiosConfig from "../axiosConfig";

export const apiGetCurrentProfile = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/get-current-profile',
        })
        resolve(response)
    
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateProfile = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'put',
            url: '/api/v1/user/update-profile',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})