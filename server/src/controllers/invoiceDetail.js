import * as InvoiceDetailServices from '../services/invoiceDetail';

export const createInvoiceDetail = async (req, res) => {
    try {
        const invoiceId = req.params.invoiceId
        const { item_description, unit, quantity, unit_price } = req.body;

        // check body miss
        if (!invoiceId || !item_description || !unit || !quantity || !unit_price) {
            res.status(400).json({
                err: 1,
                msg: "Missing input!"
            })
        }

        const response = await InvoiceDetailServices.createInvoiceDetailServices(invoiceId, item_description, unit, quantity, unit_price)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to create invoice ' + error,
        })
    }
}

export const getInvoiceDetail = async (req, res) => {
    try {
        const invoiceId = req.params.invoiceId
        

        const response = await InvoiceDetailServices.getInvoiceDetaillServices(invoiceId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to get invoice ',
        })
    }
}


export const updateInvoiceDetail = async (req, res) => {
    try {
        const invoiceDetailId = req.params.invoiceDetailId
        const { item_description, unit, quantity, unit_price } = req.body;

        const response = await InvoiceDetailServices.updateInvoiceDetaillServices(invoiceDetailId, item_description, unit, quantity, unit_price)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to update invoice ',
        })
    }
}


export const deleteInvoiceDetail = async (req, res) => {
    try {
        const invoiceDetailId = req.params.invoiceDetailId

        const response = await InvoiceDetailServices.deleteInvoiceDetaillServices(invoiceDetailId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to delete ',
        })
    }
}