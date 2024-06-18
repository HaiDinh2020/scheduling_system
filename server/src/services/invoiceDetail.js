import db, { sequelize } from "../models"
import { v4 } from "uuid"

export const createInvoiceDetailServices = (invoice_id, item_description, unit, quantity, unit_price) => new Promise(async (resolve, reject) => {
    try {
        const invoice = await db.InvoiceDetail.create({
            id: v4(),
            invoice_id,
            item_description,
            unit,
            quantity,
            unit_price
        });

        resolve({
            err: 0,
            msg: "success to create invoice detail",
            response: invoice
        });
    } catch (error) {
        reject(error)
    }
})

export const getInvoiceDetaillServices = (invoice_id) => new Promise(async (resolve, reject) => {
    try {
        const invoiceDetails = await db.InvoiceDetail.findAll({
            where: { invoice_id: invoice_id }
        });

        resolve({
            err: 0,
            msg: "success to get invoice detail",
            response: invoiceDetails
        });
    } catch (error) {
        reject(error)
    }
})

export const updateInvoiceDetaillServices = (invoiceDetailId, item_description, unit, quantity, unit_price) => new Promise(async (resolve, reject) => {
    try {
        const invoiceDetail = await db.InvoiceDetail.findOne({
            where: { id: invoiceDetailId }
        });
        if (!invoiceDetail) {
            return reject("invoiceDetail not found")
        } else {
            const response = await invoiceDetail.update({
                item_description,
                unit,
                quantity,
                unit_price
            })
            return resolve({
                err: 0,
                msg: "update invoice success",
                response
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const deleteInvoiceDetaillServices = (invoiceDetail_id) => new Promise(async (resolve, reject) => {
    try {
        const invoiceDetail = await db.InvoiceDetail.destroy({
            where: { id: invoiceDetail_id }
        });

        resolve({
            err: 0,
            msg: "success to get invoice detail",
        });
    } catch (error) {
        reject(error)
    }
})