import { Op } from "sequelize"
import db, { Sequelize, sequelize } from "../models"
import { v4 } from "uuid"
import { createTaskBookingServices, deleteTaskServices } from "./task"
import { sendNotiServices } from "./notification"
require('dotenv').config()

// done
export const createBookingServices = (customer_id, car_id, status, services, description, booking_images, booking_date, address, exactAddress, pickupOption) => new Promise(async (resolve, reject) => {
    try {

        const checkBooking = await db.Booking.findOne({
            where: {
                car_id: car_id,
                status: { [Op.in]: ['in-progress', 'request'] }
            }
        })

        if (checkBooking) {
            return reject("This car has been booking")
        }

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
        let radius = 10; // Bán kính ban đầu
        const limit = 2;
        let garages = [];

        while (garages.length === 0) {
            garages = await findNearestGarages(exactAddress, limit, radius);

            if (garages.length === 0) {
                radius += 5; // Tăng bán kính tìm kiếm nếu không tìm thấy garage
            }
            if (radius > 1500) {
                return reject("Không tìm thấy chi nhánh nào xung quanh bạn")
            }
        }
        console.log(garages)

        // gửi socket booking tới 2 garage
        // lắng nghe sự kiện soket garage gửi về ở file server.js để xem garage nào nhận booking này sau đó sẽ cập nhật trạng thái booking và garage_id
        console.log(global.onlineUsers2)
        const titleNoti = "Đặt lịch";
        const bodyNoti = "Có lịch đặt sửa chữa từ khách hàng"
        garages?.forEach(async (garage) => {
            // gửi thông báo
            try {
                const responseSend = await sendNotiServices(garage.owner_id, titleNoti, bodyNoti)
            } catch (error) {
                console.log("gửi thông báo tới garage thất bại")
            }

            await db.BookingGarage.create({ id: v4(), garage_id: garage.id, booking_id: booking.id, status: 'pending' })
            const garage_socketId_receive = global.onlineUsers2.find((user) => user.userId === garage.owner_id)
            console.log(111111)
            console.log(garage_socketId_receive)
            if (garage_socketId_receive) {
                global.bookingNamespace.to(garage_socketId_receive?.socketId).emit('booking_request', bookingCreated);
            }
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

export const createBookingMaintenanceServices = (
    customer_id, garage_id, car_id, status, services, address, exactAddress, pickupOption,
    mechanic_id, title, description, startTime, endTime, createBy
) => new Promise(async (resolve, reject) => {
    try {
        // tạo booking
        const booking = await db.Booking.create({
            id: v4(),
            customer_id,
            garage_id,
            car_id,
            status,
            services,
            description,
            booking_date: startTime,
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
                { model: db.Garage, as: 'garage', attributes: ['garage_name', 'garageAddress', 'exactAddress', 'owner_id'] },
                { model: db.User, as: 'customer', attributes: ['name', 'phone', 'avatar'] }
            ],
            attributes: ['id', 'status', 'services', 'description', 'booking_images', 'booking_date']
        });

        // thêm vào task của mechanic, thời gian từ 90p-3h
        const task = await createTaskBookingServices(description, garage_id, booking.id, mechanic_id, "medium", "assigned", startTime, 120)
        const titleNoti = "Đặt lịch";
        const bodyNoti = "Có lịch đặt bảo dưỡng từ khách hàng"
        try {
            const responseSend = await sendNotiServices(bookingCreated?.garage?.owner_id, titleNoti, bodyNoti)
        } catch (error) {
            console.log("gửi thông báo tới garage thất bại")
        }

        resolve({
            err: 0,
            msg: "success to create schedule",
            response: bookingCreated
        });

    } catch (error) {
        reject(error)
    }
})

const findNearestGarages = async (exactAddress, numGarage, maxDistance, excludedGarageIds = []) => {
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
            where: {
                latitude: {
                    [Op.between]: [minLat, maxLat]
                },
                longitude: {
                    [Op.between]: [minLon, maxLon]
                },
                id: {
                    [Op.notIn]: excludedGarageIds
                }
            },
            order: [
                ['score', 'DESC'],
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

export const getAllBookingCustomerServices = (customerId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Booking.findAll({
            where: { customer_id: customerId },
            raw: true,
            nest: true,
            include: [
                { model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] },
                {
                    model: db.Garage, as: 'garage',
                    attributes: ['garage_name', 'garageAddress', 'exactAddress', 'owner_id'],
                    include: [{ model: db.User, as: 'user', attributes: ['name', 'phone', 'avatar'] },]
                },
                { model: db.Invoice, as: 'invoice', attributes: ['id', 'amount', 'status', 'invoice_image'] },
                { model: db.MaintenanceSchedule, as: 'maintenance', attributes: ['id', 'maintenanceTime', 'note'] }
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

export const cancelBookingServices = async (bookingId, whoDelete) => new Promise(async (resolve, reject) => {
    try {
        // if bookingrepair => garage = null, task = null
        const booking = await db.Booking.findOne({
            where: { id: bookingId },
            include: [
                { model: db.Garage, as: 'garage', attributes: ['owner_id'] },
                { model: db.Task, as: 'task', attributes: ['id'] }
            ],
            attributes: ['id', 'status', 'customer_id']
        });

        if (!booking) {
            reject("booking not found")
        } else {
            const transaction = await db.sequelize.transaction();
            const status = booking.status;

            // xóa lịch bảo dưỡng
            if (status === "schedule") {

                const deletetask = await db.Task.destroy({ where: { id: booking.task.id } }, { transaction })
                const deleteBooking = await booking.destroy({ transaction })

                // nếu người hủy là khách hàng thì báo đến garage, nếu là garage từ chối thì báo đến khách hàng
                if (whoDelete !== 'garage') {
                    let titleNoti = "Hủy Đặt lịch";
                    let bodyNoti = "Khách hàng đã hủy lịch đặt";
                    try {
                        const responseSend = await sendNotiServices(booking.garage.owner_id, titleNoti, bodyNoti)
                    } catch (error) {
                        console.log("gửi thông báo tới garage thất bại")
                    }
                } else {
                    let titleNoti = "Hủy Lịch Đặt"
                    let bodyNoti = "Garage đã từ chối lịch đặt, liên hệ với garage để biết thêm chi tiết"
                    try {
                        const responseSend = await sendNotiServices(booking.customer_id, titleNoti, bodyNoti)
                    } catch (error) {
                        console.log(error)
                        console.log("gửi thông báo hủy lịch đặt tới khách hàng thất bại")
                    }
                }

                await transaction.commit();

                return resolve({
                    err: 0,
                    msg: "Delete booking success"
                })
            }
                // xóa lịch sửa chữa khi chưa có garage nào nhận
            else if (status === 'request') {
                const deleteBooking = await booking.destroy({ transaction })
                await transaction.commit();

                return resolve({
                    err: 0,
                    msg: "Delete booking success"
                })
            } else {
                return resolve({
                    err: 1,
                    msg: "Hủy lịch đặt thất bại"
                })
            }
        }
    } catch (error) {
        reject(error)
    }
})

// garage action
//done
export const getAllBookingServices = (garageId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Booking.findAll({
            where: { garage_id: garageId },
            raw: true,
            nest: true,
            include: [
                { model: db.User, as: 'customer', attributes: ['id', 'name', 'phone', 'avatar'] },
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
                { model: db.User, as: 'customer', attributes: ['id', 'name', 'phone', 'avatar'] },
                { model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] },
                { model: db.Invoice, as: 'invoice', attributes: ['id', 'amount', 'status', 'invoice_image'] },
                { model: db.MaintenanceSchedule, as: 'maintenance', attributes: ['id', 'maintenanceTime', 'note'] }
            ],
            attributes: ['id', 'status', 'services', 'description', 'booking_images', 'booking_date', 'pickupOption', 'address']
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

export const getBookingRequestServices = (garageId) => new Promise(async (resolve, reject) => {
    try {

        const response = await db.BookingGarage.findAll({
            where: {
                garage_id: garageId,
                status: 'pending'
            },
            raw: true,
            nest: true,
            include: [
                {
                    model: db.Booking,
                    as: 'booking',
                    where: { status: 'request' },
                    include: [
                        { model: db.User, as: 'customer', attributes: ['id', 'name', 'phone', 'avatar'] },
                        { model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] },
                        { model: db.Invoice, as: 'invoice', attributes: ['id', 'amount', 'status', 'invoice_image'] },
                        { model: db.MaintenanceSchedule, as: 'maintenance', attributes: ['id', 'maintenanceTime', 'note'] }
                    ],
                    attributes: ['id', 'status', 'services', 'description', 'booking_images', 'booking_date']
                }
            ],
            attributes: ['id', 'status']
        })

        if (!response) {
            reject("Booking not found")
        }

        const formattedResponse = response.map(booking => ({
            id: booking.booking.id,
            booking_garage_id: booking.id,
            status: booking.booking.status,
            services: booking.booking.services,
            description: booking.booking.description,
            booking_images: booking.booking.booking_images,
            booking_date: booking.booking.booking_date,
            customer: {
                id: booking.booking.customer.id,
                name: booking.booking.customer.name,
                phone: booking.booking.customer.phone,
                avatar: booking.booking.customer.avatar
            },
            car: {
                make: booking.booking.car.make,
                model: booking.booking.car.model,
                number_plate: booking.booking.car.number_plate
            },
            invoice: {
                id: booking.booking.invoice ? booking.booking.invoice.id : null,
                amount: booking.booking.invoice ? booking.booking.invoice.amount : null,
                status: booking.booking.invoice ? booking.booking.invoice.status : null,
                invoice_image: booking.booking.invoice ? booking.booking.invoice.invoice_image : null
            },
            maintenance: {
                id: booking.booking.maintenance ? booking.booking.maintenance.id : null,
                maintenanceTime: booking.booking.maintenance ? booking.booking.maintenance.maintenanceTime : null,
                note: booking.booking.maintenance ? booking.booking.maintenance.note : null
            }
        }));
        resolve({
            err: 0,
            msg: "success to find all schedule",
            response: formattedResponse
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

// update garage for booking==> use below function
export const updateBookingGarageServices = (garageId, bookingId, level, estimated_time) => new Promise(async (resolve, reject) => {
    try {
        const booking = await db.Booking.findOne({ where: { id: bookingId } });

        if (!booking) {
            reject("booking not found")
        } else {
            if (booking.status === "cancelled") {
                return resolve({
                    err: 1,
                    msg: "Booking has already cancelled"
                });
            }
            if (booking.garage_id === null) {
                const response = await booking.update({ garage_id: garageId, status: "in-progress" })

                // gửi thông báo tới customer
                try {
                    const titleNoti = "Đặt lịch sửa chữa thành công!"
                    const bodyNoti = booking.pickupOption === 0 ? "Bạn vui lòng chờ trong giây lát, garage sẽ đến lấy phương tiện của bạn!" : "Vui lòng đưa xe đến garage, xin cảm ơn!"
                    const sendNoti = await sendNotiServices(booking.customer_id, titleNoti, bodyNoti)
                } catch (error) {
                    console.log("gửi thông báo tới garage thất bại")
                }
                return resolve({
                    err: 0,
                    msg: "update garage booking success",
                    response: response
                })
            } else {
                return resolve({
                    err: 1,
                    msg: "Booking has already been accepted"
                });
            }
        }
    } catch (error) {
        reject(error)
    }
})

export const respondToBookingService = (bookingGarageId, status) => new Promise(async (resolve, reject) => {

    try {
        const transaction = await db.sequelize.transaction();

        const garageBooking = await db.BookingGarage.findOne({ where: { id: bookingGarageId } });

        if (!garageBooking) {
            return reject(new Error("Garage booking not found."))
        }

        if (garageBooking.status !== 'pending') {
            return reject(new Error("Booking already processed."))
        }

        const booking = await db.Booking.findOne({ where: { id: garageBooking.booking_id } });

        if (!booking) {
            return reject(new Error("Booking not found."))
        }


        if (status === 'accepted') {

            await booking.update({ status: 'in-progress', garage_id: garageBooking.garage_id }, { transaction });

            await db.BookingGarage.update({ status: 'rejected' }, {
                where: { booking_id: booking.id, id: { [Op.ne]: garageBooking.id } },
                transaction
            });

            await garageBooking.update({ status }, { transaction });

            await transaction.commit();

            // Gửi thông báo tới khách hàng về việc booking đã được chấp nhận
            try {
                const titleNoti = "Đặt lịch sửa chữa thành công!";
                const bodyNoti = "Garage đã chấp nhận lịch sửa chữa của bạn.";
                await sendNotiServices(booking.customer_id, titleNoti, bodyNoti);
            } catch (error) {
                console.log("sent noti failed")
            }

            return resolve({ err: 0, msg: "Booking accepted and updated successfully." })
        } else if (status === 'rejected') {
            await garageBooking.update({ status }, { transaction });
            await transaction.commit();


            // Logic để gửi yêu cầu đến garage khác nếu cần thiết
            const otherGarageBookings = await db.BookingGarage.findAll({
                where: {
                    booking_id: booking.id,
                    status: 'pending',
                    id: { [Op.ne]: garageBooking.id }
                }
            });

            if (otherGarageBookings.length === 0) {
                const beforeGarageBookings = await db.BookingGarage.findAll({ where: { booking_id: booking.id, status: 'rejected', id: { [Op.ne]: garageBooking.id } } })
                const beforeGarageIds = beforeGarageBookings.map(bookingGarage => bookingGarage.garage_id);

                let garages = [];
                let limit = 2;
                let radius = 10;

                while (garages.length === 0) {
                    garages = await findNearestGarages(booking.exactAddress, limit, radius, beforeGarageIds);
        
                    if (garages.length === 0) {
                        radius += 5; // Tăng bán kính tìm kiếm nếu không tìm thấy garage
                    }
                    if (radius > 1500) {
                        return reject("Không tìm thấy chi nhánh nào xung quanh bạn")
                    }
                }
                // const otherGarages = await findNearestGarages(booking.exactAddress, 2, 10, beforeGarageIds);
                // const otherGarages = nearestGarages.filter(garage => garage.id !== garageBooking.garage_id);
                
                for (const garage of garages) {
                    await db.BookingGarage.create({ id: v4(), garage_id: garage.id, booking_id: booking.id, status: 'pending' })
                    try {
                        const titleNoti = "Yêu cầu đặt lịch sửa chữa";
                        const bodyNoti = "Có yêu cầu đặt lịch sửa chữa mới từ khách hàng.";
                        await sendNotiServices(garage.owner_id, titleNoti, bodyNoti);
                    } catch (error) {
                        console.log("gửi thông báo tới garage thất bại")
                    }

                }
            
            }

            return resolve({ err: 0, msg: "Booking rejected and notified other garages." });
        }


    } catch (error) {
        reject(error)
    }
})

export const respondToBookingMaintenance = (bookingId) => new Promise(async (resolve, reject) => {
    try {
        const booking = await db.Booking.findOne({ where: { id: bookingId } });

        if (!booking) {
            reject("booking not found")
        } else {
            const status = booking.status;
            const response = await booking.update({ status: newStatus })

            console.log(response)
            resolve({
                err: 0,
                msg: "update status booking success",
                response
            })
        }
    } catch (error) {

    }
})

