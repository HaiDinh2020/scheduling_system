import axiosConfig from "../axiosConfig";
import axios from "axios";

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

export const apiUploadAvatar = async (formData) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url:   `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, 
            data: formData
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})