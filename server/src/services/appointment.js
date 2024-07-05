import { Op } from "sequelize"
import db, { sequelize } from "../models"
import { v4 } from "uuid"
require('dotenv').config()

export const createAppointmentServices = (mechanic_id, task_id = null,  title, description, startTime, endTime, status, createBy) => new Promise(async (resolve, reject) => {
    try {
        console.log(mechanic_id, title, description, startTime, endTime, createBy)

        const appointment = await db.Appointment.create({
            id: v4(),
            mechanic_id,
            task_id,
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

export const UpdateAppointmentServices = (appointmentId, title, description) => new Promise(async (resolve, reject) => {
    try {

        const appointment = await db.Appointment.findOne({
            where: {id: appointmentId}
        });

        if(!appointment) {
            return reject("appointment not found")
        } else {
            await appointment.update({title, description})
            resolve({
                err: 0,
                msg: "success to update appointment",
                response: appointment
            });
        }
    } catch (error) {
        reject(error)
    }
})

export const changeStatusAppointmentServices = (appointmentId, status) => new Promise(async (resolve, reject) => {
    try {

        const appointment = await db.Appointment.findOne({
            where: {id: appointmentId}
        });

        if(!appointment) {
            return reject("appointment not found")
        } else {
            await appointment.update({status})
            resolve({
                err: 0,
                msg: "success to update appointment",
                response: appointment
            });
        }
    } catch (error) {
        reject(error)
    }
})

export const deleteAppointmentServices = (appointmentId) => new Promise(async (resolve, reject) => {
    try {
        const appointment = await db.Appointment.findOne({
            where: {id: appointmentId}
        });

        if(!appointment) {
            return reject("appointment not found")
        } else {
            await appointment.destroy()
            resolve({
                err: 0,
                msg: "success to delete appointment",
            });
        }
    } catch (error) {
        reject(error)
    }
})


// not complete
export const checkAppointmentMechanicOfGarage = (garage_id, startTime, endTime) => new Promise(async (resolve, reject) => {

})