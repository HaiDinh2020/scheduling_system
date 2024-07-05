import { Op, where } from "sequelize"
import db, { sequelize } from "../models"
import { v4 } from "uuid"
import { createAppointmentServices } from "./appointment"
require('dotenv').config()

export const createTaskServices = (task_name, garage_id, booking_id, assign_to, level, task_status, allocation_date, estimated_time, start_date, start_time, end_date, end_time) => new Promise(async (resolve, reject) => {
    try {

        const newTask = await db.Task.create({
            id: v4(),
            task_name,
            garage_id,
            booking_id,
            assign_to,
            level,
            task_status,
            allocation_date,
            estimated_time,
            start_date,
            start_time,
            end_date,
            end_time
        })
        const tasks = await db.Task.findAll({ where: { garage_id: garage_id } })
        resolve({
            err: 0,
            msg: "success to create new task",
            response: newTask,
            tasks
        });
    } catch (error) {
        reject(error)
    }
})

export const createTaskBookingServices = (task_name, garage_id, booking_id, assign_to, level, task_status, allocation_date, estimated_time, start_date, start_time, end_date, end_time) => new Promise(async (resolve, reject) => {
    try {

        const newTask = await db.Task.create({
            id: v4(),
            task_name,
            garage_id,
            booking_id,
            assign_to,
            level,
            task_status,
            allocation_date,
            estimated_time,
            start_date,
            start_time,
            end_date,
            end_time
        })
        const tasks = await db.Task.findAll({ where: { garage_id: garage_id } })
        resolve({
            err: 0,
            msg: "success to create new task",
            response: newTask,
            tasks
        });
    } catch (error) {
        reject(error)
    }
})

export const getTaskServices = (garage_id) => new Promise(async (resolve, reject) => {
    try {

        const tasks = await db.Task.findAll({
            where: { garage_id: garage_id },
            include: [
                { 
                    model: db.Booking, as: 'belong_booking', attributes: ['status'],
                    include: [
                        { model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] },
                    ]
                }
            ]
        })

        resolve({
            err: 0,
            msg: "success to get task of garage",
            response: tasks
        });
    } catch (error) {
        reject(error)
    }
})

export const updateTaskServices = (task_id, level, task_status, estimated_time, assign_to, allocation_date, start_date, start_time, end_date, end_time) => new Promise(async (resolve, reject) => {
    try {
        const task = await db.Task.findOne({ where: { id: task_id } });

        if (!task) {
            reject("task not found")
        } else {
            const response = await task.update({ level, task_status, estimated_time, assign_to, allocation_date, start_date, start_time, end_date, end_time })
            const tasks = await db.Task.findAll({ where: { garage_id: task.garage_id } })
            resolve({
                err: 0,
                msg: "update status task success",
                response,
                tasks
            })
        }

    } catch (error) {
        reject(error)
    }
})

// phía mechanic
export const getTaskMechanicServices = (mechanicId) => new Promise(async (resolve, reject) => {
    try {
        const mechanic = await db.Mechanic.findOne({ where: { id: mechanicId } })

        if (!mechanic) reject("Mechanic not found")

        const tasks = await db.Task.findAll({
            where: { assign_to: mechanicId },
            include: [
                { 
                    model: db.Booking, as: 'belong_booking', attributes: ['status'],
                    include: [
                        { model: db.Car, as: 'car', attributes: ['make', 'model', 'number_plate'] },
                    ]
                }
            ]
        })

        resolve({
            err: 0,
            msg: "success to get task of mechanic",
            response: tasks
        });
    } catch (error) {
        reject(error)
    }
})

export const updateTaskMechanicServices = (taskId, task_status, start_date, start_time, end_date, end_time) => new Promise(async (resolve, reject) => {
    try {
        const task = await db.Task.findOne({ where: { id: taskId } });

        if (!task) {
            reject("task not found")
        } else {
            const updatedTask = await task.update(
                {
                    task_status: task_status,
                    start_date: start_date,
                    start_time: start_time,
                    end_date: end_date,
                    end_time: end_time
                }
            );

            if (task_status === "in_progress") {
                try {
                    const startTime = new Date(start_date + "T" + start_time)
                    const endTime = new Date(startTime.getTime() + task.estimated_time * 60000)
                    // console.log(123)
                    // console.log(task.assign_to, task.task_name, startTime, endTime)
                    
                    await createAppointmentServices(task.assign_to,taskId,  "Sua chua", task.task_name, startTime, endTime, 'in-progress', "mechanic")
                } catch (error) {
                    return resolve({
                        err: 0,
                        msg: "Error to add to your appointmet",
                        response: updatedTask || {}
                    });
                }
            }

            if (task_status === "completed") {
                try {
                    // gửi thông báo tới garage
                    // cập nhật appointment
                    const endTime = new Date(end_date + "T" + end_time)
                    const appointment = await db.Appointment.findOne({where: {task_id: taskId}})
                    if(appointment) {
                        appointment.update({status: 'done', endTime: endTime})
                    }
                } catch (error) {
                    return resolve({
                        err: 0,
                        msg: "Error to add to your appointmet",
                        response: updatedTask || {}
                    });
                }
            }

            resolve({
                err: 0,
                msg: "Update status task success",
                response: updatedTask || {}
            });

        }

    } catch (error) {
        reject(error)
    }
})

export const deleteTaskServices = (taskId) => new Promise(async (resolve, reject) => {
    try {
        const task = await db.Task.findOne({where: {id: taskId}})

        if(!task) {
            return reject("Task not found")
        } else {
            await task.destroy()

            return resolve({
                err: 0,
                msg: "Delete task success"
            })
        }
    } catch (error) {
        reject(error)
    }
})