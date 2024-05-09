import axios from "axios";
import axiosConfig from "../../axiosConfig";

export const apiGetAllGarage = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/garage',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetMake = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=make&group_by=make&order_by=make"
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetModel = (make) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: "get",
            url: `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=make%2C%20model&where=make%3D%22${make}%22%20&group_by=make%2C%20model&order_by=model`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetYear = (make, model) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=make%2C%20model%2C%20year&where=make%3D%22${make}%22%20%20and%20model%20%3D%20%22${model}%22&group_by=make%2C%20model%2C%20year&order_by=year`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})