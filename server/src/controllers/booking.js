import * as BookingServices from '../services/booking';

export const createBooking = async (req, res) => {
    try {

        const customer_id = req.user.id
        const garage_id = req.body.garage_id
        const car_id = req.body.car_id
        const status = "request"
        const services = req.body.services
        const description = req.body.description
        const booking_images = req.body.booking_images
        const booking_date = req.body.booking_date

        // check body miss
        if (!customer_id || !garage_id || !car_id || !services || !booking_date) {
            res.status(400).json({
                err: 1,
                msg: "Missing input!"
            })
        }

        const response = await BookingServices.createBookingServices(customer_id, garage_id, car_id, status, services, description, booking_images, booking_date)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to create schedule' + error,
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

export const updateStatusBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const newStatus = req.body.status;
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