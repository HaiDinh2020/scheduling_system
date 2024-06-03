import { Op } from "sequelize"
import db, { sequelize } from "../models"
import { v4 } from "uuid"
require('dotenv').config()

export const createInvoiceServices = (garage_id, booking_id, amount, invoice_image) => new Promise(async (resolve, reject) => {
    try {
        const invoice = await db.Invoice.create({
            id: v4(),
            garage_id,
            booking_id,
            amount,
            status: 'pending',
            invoice_image
          });

        resolve({
            err: 0,
            msg: "success to create invoice",
            response: invoice
        });
    } catch (error) {
        reject(error)
    }
})

export const getInvoiceServices = (invoiceId) => new Promise(async (resolve, reject) => {
    try {
        const invoice = await db.Invoice.findOne({ 
            where: { id: invoiceId },
            include: [
                { model: db.Garage},
                { model: db.User },
                { model: db.Transaction },
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