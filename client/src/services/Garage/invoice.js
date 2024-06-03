import axiosConfig from "../../axiosConfig";

export const apiCreateInvoice = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url:'/api/v1/invoice/garage',
            data: payload
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})