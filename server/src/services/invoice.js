import { Op } from "sequelize"
import db, { sequelize } from "../models"
import { v4 } from "uuid"
import { sendNotiServices } from "./notification"
require('dotenv').config()

export const createInvoiceServices = (garage_id, booking_id, amount, invoice_image) => new Promise(async (resolve, reject) => {
    try {
        const invoice = await db.Invoice.create({
            id: v4(),
            garage_id,
            booking_id,
            amount,
            status: 'unpaid',
            invoice_image
        });

        return resolve({
            err: 0,
            msg: "success to create invoice",
            response: invoice
        });
    } catch (error) {
        reject(error)
    }
})

export const updateInvoiceServices = (invoiceId, amount, invoice_image) => new Promise(async (resolve, reject) => {
    try {
        const invoice = await db.Invoice.findOne({
            where: { id: invoiceId }
        });
        if (!invoice) {
            return reject("invoice not found")
        } else {
            const response = await invoice.update({
                amount,
                invoice_image
            })

            // gửi thông báo tới customer
            try {
                const booking = await db.Booking.findOne({ where: {id: invoice.booking_id}})
                const sendNoti = await sendNotiServices(booking.customer_id, "Hóa đơn", "Bạn có hóa đơn từ garage")
            } catch (error) {
                console.log("thông báo gửi hóa đơn tới khách hàng thất bại")
            }
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

export const getInvoiceServices = (invoiceId) => new Promise(async (resolve, reject) => {
    try {
        const invoice = await db.Invoice.findOne({
            where: { id: invoiceId },
            include: [
                { model: db.Garage, as: 'garage', attributes: ['owner_id'] },
                { model: db.Transaction, as: 'transactions' },
            ],
        });

        resolve({
            err: 0,
            msg: "success to get invoice",
            response: invoice
        });
    } catch (error) {
        reject(error)
    }
})