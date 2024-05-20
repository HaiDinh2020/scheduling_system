import axiosConfig from "../axiosConfig";

export  const apiCreateMessage = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/message/send',
            data: payload
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apigetChatPartners = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/message',
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetMessagesBetweenUsers = (userId2) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method:'get',
            url: `/api/v1/message/${userId2}`
        })
        
        resolve(response)
    } catch (error) {
        reject(error)
    }
})