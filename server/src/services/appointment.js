import { Op } from "sequelize"
import db, { sequelize } from "../models"
import { v4 } from "uuid"
require('dotenv').config()

export const createAppointmentServices = (mechanic_id, title, description, startTime, endTime, createBy) => new Promise(async (resolve, reject) => {
    try {
        console.log(mechanic_id, title, description, startTime, endTime, createBy)
        const overlappingAppointments = await db.Appointment.findOne({
            where: {
                mechanic_id,
                [Op.or]: [
                    { startTime: { [Op.between]: [startTime, endTime] } },
                    {
                        endTime: {
                            [Op.between]: [startTime, endTime]
                        }
                    },
                    {
                        [Op.and]: [
                            {
                                startTime: {
                                    [Op.lte]: startTime
                                }
                            },
                            {
                                endTime: {
                                    [Op.gte]: endTime
                                }
                            }
                        ]
                    }
                ]

            }
        })

        if (overlappingAppointments) {
            return resolve({
                err: 1,
                msg: "There is overlapping time with existing appointments."
            });
        }

        const appointment = await db.Appointment.create({
            id: v4(),
            mechanic_id,
            title,
            description,
            startTime,
            endTime,
            createBy
        });

        resolve({
            err: 0,
            msg: "success to create appointment",
            response: appointment
        });
    } catch (error) {
        console.log(error)
        reject(error)
    }
})

export const GetAppointmentServices = (mechanic_id) => new Promise(async (resolve, reject) => {
    try {

        const appointments = await db.Appointment.findAll({
            where: { mechanic_id: mechanic_id }
        });

        resolve({
            err: 0,
            msg: "success to get appointment",
            response: appointments
        });
    } catch (error) {
        reject(error)
    }
})

export const UpdateAppointmentServices = (mechanic_id, booking_id, title, description, startTime, endTime, status, createBy) => new Promise(async (resolve, reject) => {
    try {

        const appointment = await db.Appointment.create({
            id: v4(),
            mechanic_id,
            booking_id,
            title,
            description,
            startTime,
            endTime,
            status,
            createBy
        });

        resolve({
            err: 0,
            msg: "success to create appointment",
            response: appointment
        });
    } catch (error) {
        reject(error)
    }
})


// not complete
export const checkAppointmentMechanicOfGarage = (garage_id, startTime, endTime) => new Promise(async (resolve, reject) => {

})