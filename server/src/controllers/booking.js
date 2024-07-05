import { Op } from 'sequelize';
import db, { sequelize } from '../models';
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
            msg: 'Fail to create schedule ' + error,
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
        const whoDelete = req.user.role;
        const response = await BookingServices.cancelBookingServices(bookingId, whoDelete)
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

export const getBookingRequest = async (req, res) => {
    try {
        const garageId = req.params.garageId
        
        if(!garageId ) {
            return res.status(401).json({
                err: 1,
                msg: "Missing id"
            })
        }
        
        const response = await BookingServices.getBookingRequestServices(garageId)
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

export const respondToBooking = async (req, res) => {
    try {
        const bookingGarageId = req.params.bookingGarageId;
        const status = req.body.status
        
        if (!bookingGarageId ) {
            return res.status(400).json({
                err: 1,
                msg: "Missing id!"
            })
        }

        console.log(bookingGarageId)


        const response = await BookingServices.respondToBookingService(bookingGarageId, status)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: "Fail to update status: " + error
        })
    }
}

// test

export const testFindNearestGarages = async (req, res) => {
    try {
        let garages = [];
        let radius = 10; // Bán kính ban đầu
        const limit = 2;
        while (garages.length === 0) {
            garages = await findNearestGarages("21.0308, 105.8014", 2, radius);

            if (garages.length === 0) {
                radius += 5; // Tăng bán kính tìm kiếm nếu không tìm thấy garage
            }
            if(radius > 15) {
                return reject("Không tìm thấy chi nhánh nào xung quanh bạn")
            }
        }
        return res.status(200).json({
            response: garages
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({err: error})
    }
}

const findNearestGarages = async (exactAddress, numGarage, maxDistance) => {
    const [latitude, longitude] = exactAddress.split(", ").map(coord => parseFloat(coord));

    const boundingBox = (latitude, longitude, distance) => {
        const earthRadius = 6371;
    
        // Convert từ độ sang radian
        const radLat = (latitude * Math.PI) / 180;
        const radLon = (longitude * Math.PI) / 180;
        const radDist = distance / earthRadius;
    
        // Tính toán vĩ độ tối thiểu và tối đa
        const minLat = radLat - radDist;
        const maxLat = radLat + radDist;
    
        // Tính toán kinh độ tối thiểu và tối đa
        const deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
        const minLon = radLon - deltaLon;
        const maxLon = radLon + deltaLon;
    
        // Convert từ radian sang độ
        const minLatDeg = (minLat * 180) / Math.PI;
        const maxLatDeg = (maxLat * 180) / Math.PI;
        const minLonDeg = (minLon * 180) / Math.PI;
        const maxLonDeg = (maxLon * 180) / Math.PI;
    
        return {
            minLat: minLatDeg,
            maxLat: maxLatDeg,
            minLon: minLonDeg,
            maxLon: maxLonDeg,
        };
    };

    const { minLat, maxLat, minLon, maxLon } = boundingBox(latitude, longitude, maxDistance);

    const haversineFormula = `
            6371 * acos(
            cos(radians(${latitude})) * cos(radians(latitude))
            * cos(radians(longitude) - radians(${longitude}))
            + sin(radians(${latitude})) * sin(radians(latitude))
            )
        `;

    try {
        const nearGarage = await db.Garage.findAll({
            attributes: {
                include: [
                    [sequelize.literal(haversineFormula), 'distance'],
                ]
            },
            where: {
                latitude: {
                    [Op.between]: [minLat, maxLat]
                },
                longitude: {
                    [Op.between]: [minLon, maxLon]
                }
            },
            order: [
                sequelize.col('distance')
            ],
            having: sequelize.where(
                sequelize.col('distance'),
                { [Op.lte]: maxDistance } // 5 km
            ),
            limit: numGarage
        });
        return nearGarage;
    } catch (error) {
        console.log(error)
        return []
    }
}
