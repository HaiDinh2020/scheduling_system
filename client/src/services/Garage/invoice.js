import axiosConfig from "../../axiosConfig";

export const apiCreateInvoice = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url:'/api/v1/invoice/garage',
            data: payload
        })
        console.log("response here")
        if (response.status === 200) {
            resolve(response); 
        } else if (response.status === 400 && response.data.msg === "Missing input!") {
            reject(new Error("Missing input!"));
        }
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateInvoice = (invoiceId, payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url:`/api/v1/invoice/garage/${invoiceId}`,
            data: payload
        })
        
        if (response.status === 200) {
            resolve(response); 
        } else if (response.status === 400 && response.data.msg === "Missing input!") {
            reject(new Error("Missing input!"));
        }
    } catch (error) {
        reject(error)
    }
})


export const apiCreateInvoiceDetail = (invoiceId, payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url:`/api/v1/invoice-detail/garage/${invoiceId}`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apigetInvoiceDetail = (invoiceId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url:`/api/v1/invoice-detail/garage/${invoiceId}`,
        })

        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateInvoiceDetail = (invoiceDetailId, payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url:`/api/v1/invoice-detail/garage/${invoiceDetailId}`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteInvoiceDetail = (invoiceDetailId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url:`/api/v1/invoice-detail/garage/${invoiceDetailId}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})