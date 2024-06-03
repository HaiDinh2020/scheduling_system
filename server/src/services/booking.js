import { Op } from "sequelize"
import db, { sequelize } from "../models"
import { v4 } from "uuid"
require('dotenv').config()

// done
export const createBookingServices = (customer_id, car_id, status, services, description, booking_images, booking_date, address, exactAddress, pickupOption) => new Promise(async (resolve, reject) => {
    try {
        // tạo booking
        const booking = await db.Booking.create({
            id: v4(),
            customer_id,
            car_id,
            status,
            services,
            description,
            booking_images,
            booking_date,
            address,
            exactAddress,
            pickupOption
        })

        if (!booking) {
            reject("Failed to create schedule");
            return;
        }

        // trả về data để customer hiển thị ui đặt lịch
        const bookingCreated = await db.Booking.findOne({
            where: { id: booking.id },
            raw: true,
            nest: true,
            include: [
                { model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] },
                { model: db.Garage, as: 'garage', attributes: ['garage_name', 'garageAddress', 'exactAddress'] },
                { model: db.User, as: 'customer', attributes: ['name', 'phone', 'avatar'] }
            ],
            attributes: ['id', 'status', 'services', 'description', 'booking_images', 'booking_date']
        });


        // Extract latitude and longitude from exactAddress
        const [latitude, longitude] = exactAddress.split(", ").map(coord => parseFloat(coord));
        let radius = 5; // Bán kính ban đầu
        const limit = 2;
        let garages = [];

        while (garages.length === 0) {
            garages = await findNearestGarages(latitude, longitude, limit, radius);
    
            if (garages.length === 0) {
                radius += 5; // Tăng bán kính tìm kiếm nếu không tìm thấy garage
            }
        }

        // gửi socket booking tới 2 garage
        // lắng nghe sự kiện soket garage gửi về ở file server.js để xem garage nào nhận booking này sau đó sẽ cập nhật trạng thái booking và garage_id
        console.log(global.onlineUsers2)
        garages?.forEach(garage => {
            const garage_socketId_receive = global.onlineUsers2.find((user) => user.userId === garage.owner_id)
            console.log(111111)
            console.log(garage_socketId_receive)
            global.bookingNamespace.to(garage_socketId_receive?.socketId).emit('booking_request', bookingCreated);
        });

        resolve({
            err: 0,
            msg: "success to create schedule",
            response: bookingCreated
        });
    } catch (error) {
        reject(error)
    }
})

const findNearestGarages = async (latitude, longitude, numGarage, maxDistance) => {
    const haversineFormula = `
            6371 * acos(
            cos(radians(${latitude})) * cos(radians(cast(substring_index(exactAddress, ', ', 1) as DECIMAL(10, 6))))
            * cos(radians(cast(substring_index(exactAddress, ', ', -1) as DECIMAL(10, 6))) - radians(${longitude}))
            + sin(radians(${latitude})) * sin(radians(cast(substring_index(exactAddress, ', ', 1) as DECIMAL(10, 6))))
            )
        `;

    try {
        const nearGarage = await db.Garage.findAll({
            attributes: {
                include: [
                    [sequelize.literal(haversineFormula), 'distance'],
                ]
            },
            include: [
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['id', 'name', 'email'],
                    include: [
                        {
                            model: db.FirebaseToken,
                            as: 'firebasetoken',
                            attributes: ['firebaseToken']
                        }
                    ]
                }
            ],
            having: sequelize.where(
                sequelize.literal(haversineFormula),
                { [Op.lte]: maxDistance } // 5 km
            ),
            order: [
                ['score', 'DESC'], // Order by score descending
                sequelize.col('distance') // Then order by distance
            ],
            limit: numGarage
        });
        return nearGarage;
    } catch (error) {
        return []
    }
}

export const getAllBookingCustomerServices = (customerId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Booking.findAll({
            where: { customer_id: customerId },
            raw: true,
            nest: true,
            include: [
                { model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] },
                { model: db.Garage, as: 'garage', attributes: ['garage_name', 'garageAddress', 'exactAddress'] },
                { model: db.Invoice, as: 'invoice', attributes: ['id', 'amount', 'status', 'invoice_image']}
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
                { model: db.User, as: 'customer', attributes: ['name', 'phone', 'avatar'] },
                { model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] }
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
                { model: db.User, as: 'customer', attributes: ['name', 'phone', 'avatar'] },
                { model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] }
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

export const updateBookingGarageServices = (garageId, bookingId) => new Promise(async (resolve, reject) => {
    try {
        const booking = await db.Booking.findOne({ where: { id: bookingId } });

        if (!booking) {
            reject("booking not found")
        } else {
            if (booking.garage_id === null) {
                const response = await booking.update({ garage_id: garageId, status: "in-progress" })
                console.log(response)
                resolve({
                    err: 0,
                    msg: "update garage booking success",
                    response
                })
            } else {
                resolve({
                    err: 1,
                    msg: "Booking has already been accepted"
                });
            }
        }
    } catch (error) {
        reject(error)
    }
})

// sẽ gọi lại 2 garage khác khi cả 2 garage kia đều từ chối
export const handleRejectRequestBookingServices = (garageId, bookingId) => new Promise(async (resolve, reject) => {
    try {
        const booking = await db.Booking.findOne({ where: { id: bookingId } });

        if (!booking) {
            reject("booking not found")
        } else {
            if (booking.garage_id !== null) {
                const response = await booking.update({ garage_id: garageId })

                resolve({
                    err: 0,
                    msg: "update garage booking success",
                    response
                })
            } else {
                resolve({
                    err: 1,
                    msg: "Booking has already been accepted"
                });
            }
        }
    } catch (error) {
        reject(error)
    }
})