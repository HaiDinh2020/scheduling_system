import * as BookingServices from '../services/booking';
import { validateExactAdrress } from "../validators/Validator"

export const createBooking = async (req, res) => {
    try {

        const customer_id = req.user.id
        // const garage_id = req.body.garage_id // sẽ update khi garage accept
        const car_id = req.body.car_id
        const status = "request"
        const services = req.body.services      // sua_chưa/ bao_duong
        const description = req.body.description
        const booking_images = req.body.booking_images
        const booking_date = req.body.booking_date
        const address = req.body.address
        const exactAddress = req.body.exactAddress
        const pickupOption = req.body.pickupOption || "0"

        // check body miss
        if (!customer_id || !car_id || !services || !booking_date) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input!"
            })
        }

        if(!validateExactAdrress(exactAddress)) {
            return res.status(400).json({
                err: 1,
                msg: "Invalid exactAddress"
            });
        }

        const response = await BookingServices.createBookingServices(customer_id, car_id, status, services, description, booking_images, booking_date, address, exactAddress, pickupOption)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to create schedule' + error,
        })
    }
}

export const createBookingMaintenance = async (req, res) => {
    try {

        const customer_id = req.user.id
        const garage_id = req.body.garage_id 
        const car_id = req.body.car_id
        const status = "schedule"
        const services = "bao_duong"      // sua_chưa/ bao_duong
        
        const address = req.body.address
        const exactAddress = req.body.exactAddress
        const pickupOption = req.body.pickupOption || "0"
        const createBy = req.user.role
        const { mechanic_id, title, description, startTime, endTime } = req.body;

        // check body miss
        if (!customer_id || !car_id  || !garage_id || !exactAddress || !mechanic_id || !startTime ) {
            res.status(400).json({
                err: 1,
                msg: "Missing input!"
            })
        }

        if(!validateExactAdrress(exactAddress)) {
            return res.status(400).json({
                err: 1,
                msg: "Invalid exactAddress"
            });
        }

        const response = await BookingServices.createBookingMaintenanceServices(
            customer_id, garage_id, car_id, status, services, address, exactAddress, pickupOption,
            mechanic_id, title, description, startTime, endTime, createBy
        )
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to create schedule' + error,
        })
    }
}


export const getAllBookingCustomer = async (req, res) => {
    try {
        const customerId = req.user.id
        const response = await BookingServices.getAllBookingCustomerServices(customerId)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail to get all booking: " + error
        })
    }
}

export const getAllBooking = async (req, res) => {
    try {
        const garageId = req.params.garageId
        const response = await BookingServices.getAllBookingServices(garageId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: "Fail to get schedule: " + error
        })
    }
}

export const cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId
        const response = await BookingServices.updateStatusBookingServices(bookingId, "cancelled")
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: "Fail to get schedule: " + error
        })
    }
}


//garage
export const getBookingStatus = async (req, res) => {
    try {
        const garageId = req.params.garageId
        const status = req.query.status
        if(!garageId || !status) {
            return res.status(401).json({
                err: 1,
                msg: "Missing status"
            })
        }
        
        const response = await BookingServices.getBookingStatusServices(garageId, status)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Server error"
        })
    }
}

export const updateStatusBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const newStatus = req.body.newStatus;
        if (!newStatus || !bookingId) {
            res.status(400).json({
                err: 1,
                msg: "Missing input status!"
            })
        }

        const response = await BookingServices.updateStatusBookingServices(bookingId, newStatus)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: "Fail to update status: " + error
        })
    }
}

export const updateBookingGarage = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const garageId = req.params.garageId;
        console.log(req.body)
        const level = req.body.level
        const estimated_time = req.body.estimated_time
        if (!garageId ) {
            return res.status(400).json({
                err: 1,
                msg: "Missing garageId!"
            })
        }

        if (!level || !estimated_time ) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input!"
            })
        }


        const response = await BookingServices.updateBookingGarageServices(garageId, bookingId, level, estimated_time)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: "Fail to update status: " + error
        })
    }
}

// booking maintenance


