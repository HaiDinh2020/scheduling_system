import db from "../models"
import { v4 } from "uuid"
require('dotenv').config()

// done
export const createBookingServices = (customer_id, garage_id, car_id, status, services, description, booking_images, booking_date) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Booking.create({
            id: v4(),
            garage_id,
            customer_id,
            car_id,
            status,
            services,
            description,
            booking_images,
            booking_date
        })
        resolve({
            err: 0,
            msg: "success to create schedule",
            response: response
        });
    } catch (error) {
        reject(error)
    }
})

//done
export const getAllBookingServices = (garageId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Booking.findAll({ 
            where: { garage_id: garageId },
            raw: true,
            nest: true,
            include: [
                {model: db.User, as:'customer', attributes: ['name', 'phone']},
                {model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] }
            ],
            attributes: ['id', 'status', 'services', 'description', 'booking_images', 'booking_date']
        })
        if (!response) {
            reject("Booking not found")
        }
        console.log(response)
        resolve({
            err: 0,
            msg: "success to find all schedule",
            response
        })
    } catch (error) {
        reject(error)
    }
})


export const updateStatusBookingServices = (bookingId, newStatus) => new Promise(async (resolve, reject) => {
    try {
        const booking = await db.Booking.findOne({ where: { id: bookingId } });

        if (!booking) {
            reject("booking not found")
        } else {
            const response = await booking.update({ status: newStatus })
            console.log(response)
            resolve({
                err: 0,
                msg: "update status booking success",
                response
            })
        }
    } catch (error) {
        reject(error)
    }
})