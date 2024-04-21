import axios from "axios";
import axiosConfig from "../../axiosConfig";

export const apiGetGarageInfor = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/garage/infor',
        })
        resolve(response)
    
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateGarageInfor = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: '/api/v1/garage/infor',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUploadImages = (formData) => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            method:'post',
            url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, 
            data: formData
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

