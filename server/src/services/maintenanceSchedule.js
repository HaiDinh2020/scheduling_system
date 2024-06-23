import { Op } from "sequelize"
import db, { sequelize } from "../models"
import { v4 } from "uuid"
require('dotenv').config()

export const createMaintenaceScheduleServices = (booking_id, maintenanceTime, note) => new Promise(async (resolve, reject) => {
    try {
        const check = await db.MaintenanceSchedule.findOne({where: {booking_id: booking_id}})
        if(check) {
            return reject("Maintenance schedule has been create")
        }

        const checkBooking = await db.Booking.findOne({where: {id: booking_id}})
        if(!checkBooking) {
            return reject("Booking has been error")
        }

        const maintenance = await db.MaintenanceSchedule.create({
            id: v4(),
            booking_id,
            maintenanceTime,
            note
        });

        return resolve({
            err: 0,
            msg: "success to create maintenance schedule",
            response: maintenance
        });
    } catch (error) {
        console.log(error)
        reject(error)
    }
})

export const getMaintenaceScheduleServices = (maintenance_id) => new Promise(async (resolve, reject) => {
    try {
        const maintenance = await db.MaintenanceSchedule.findOne({where: {id: maintenance_id}})
        
        if(!maintenance) {
            return reject("Maintenance has not been scheduled")
        }

        return resolve({
            err: 0,
            msg: "success to get maintenance schedule",
            response: maintenance
        });
    } catch (error) {
        console.log(error)
        reject(error)
    }
})

export const updateMaintenaceScheduleServices = (maintenance_id, maintenanceTime, note) => new Promise(async (resolve, reject) => {
    try {
        const maintenance = await db.MaintenanceSchedule.findOne({where: {id: maintenance_id}})
        
        if(!maintenance) {
            return reject("Maintenance has not been scheduled")
        }

        const updateMaintenance = await maintenance.update({
            maintenanceTime,
            note
        });

        return resolve({
            err: 0,
            msg: "success to update maintenance schedule",
            response: updateMaintenance
        });
    } catch (error) {
        console.log(error)
        reject(error)
    }
})

export const deleteMaintenaceScheduleServices = (maintenance_id) => new Promise(async (resolve, reject) => {
    try {
        const maintenance = await db.MaintenanceSchedule.destroy({where: {id: maintenance_id}})

        return resolve({
            err: 0,
            msg: "success to delete maintenance schedule"
        });
    } catch (error) {
        console.log(error)
        reject(error)
    }
})