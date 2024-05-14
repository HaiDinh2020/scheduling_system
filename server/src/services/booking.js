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

        if (!response) {
            reject("Failed to create schedule");
            return;
        }

        const createdBooking = await db.Booking.findOne({ 
            where: { id: response.id },
            raw: true,
            nest: true,
            include: [
                {model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] },
                {model: db.Garage, as: 'garage', attributes: ['garage_name', 'address']}
            ],
            attributes: ['id', 'status', 'services', 'description', 'booking_images', 'booking_date']
        });
        resolve({
            err: 0,
            msg: "success to create schedule",
            response: createdBooking
        });
    } catch (error) {
        reject(error)
    }
})

export const getAllBookingCustomerServices = (customerId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Booking.findAll({ 
            where: { customer_id: customerId },
            raw: true,
            nest: true,
            include: [
                {model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] }, 
                {model: db.Garage, as: 'garage', attributes: ['garage_name', 'address']}
            ],
            attributes: ['id', 'status', 'services', 'description', 'booking_images', 'booking_date']
        })
        if (!response) {
            reject("Booking not found")
        }
        resolve({
            err: 0,
            msg: "success to find all schedule",
            response
        })
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
                {model: db.User, as:'customer', attributes: ['name', 'phone', 'avatar']},
                {model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] }
            ],
            attributes: ['id', 'status', 'services', 'description', 'booking_images', 'booking_date']
        })
        if (!response) {
            reject("Booking not found")
        }
        resolve({
            err: 0,
            msg: "success to find all schedule",
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const getBookingStatusServices = (garageId, status) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Booking.findAll({ 
            where: { 
                garage_id: garageId, 
                status: status 
            },
            raw: true,
            nest: true,
            include: [
                {model: db.User, as:'customer', attributes: ['name', 'phone', 'avatar']},
                {model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] }
            ],
            attributes: ['id', 'status', 'services', 'description', 'booking_images', 'booking_date']
        })
        if (!response) {
            reject("Booking not found")
        }
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