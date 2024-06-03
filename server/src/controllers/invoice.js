import * as InvoiceServices from '../services/invoice';
import { validateExactAdrress } from "../validators/Validator"

export const createInvoice = async (req, res) => {
    try {

        const { garage_id, booking_id, amount, invoice_image } = req.body;

        // check body miss
        if (!garage_id || !booking_id || !amount || !invoice_image) {
            res.status(400).json({
                err: 1,
                msg: "Missing input!"
            })
        }

        const response = await InvoiceServices.createInvoiceServices(garage_id, booking_id, amount, invoice_image)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to create invoice ' + error,
        })
    }
}

export const getInvoice = async (req, res) => {
    try {

        const invoiceId = req.params.invoiceId;

       

        const response = await InvoiceServices.getInvoiceServices(invoiceId)

        if (!response.invoice) {
            return res.status(404).json({
                err: 1,
                msg: 'Invoice not found',
            });
        }

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to create invoice ' + error,
        })
    }
}