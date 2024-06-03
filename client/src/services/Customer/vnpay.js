
import axiosConfig from "../../axiosConfig";

export const apiGetPaymentUrl = (paymentData) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/vnpay/create_payment_url',
            data: paymentData
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiVnpayReturn = (params)  => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/vnpay/vnpay_return',
            params: params
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})