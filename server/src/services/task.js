import { Op } from "sequelize"
import db, { sequelize } from "../models"
import { v4 } from "uuid"
import { createAppointmentServices } from "./appointment"
require('dotenv').config()

export const createTaskServices = (task_name, garage_id, assign_to, level, task_status, allocation_date, estimated_time, start_date, start_time, end_date, end_time) => new Promise(async (resolve, reject) => {
    try {

        const newTask = await db.Task.create({
            id: v4(),
            task_name,
            garage_id,
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
            where: { garage_id: garage_id }
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

// phía engineer
export const getTaskEngineerServices = (engineerId) => new Promise(async (resolve, reject) => {
    try {
        const engineer = await db.Engineer.findOne({ where: { id: engineerId } })

        if (!engineer) reject("Engineer not found")

        const tasks = await db.Task.findAll({
            where: { assign_to: engineerId }
        })

        resolve({
            err: 0,
            msg: "success to get task of engineer",
            response: tasks
        });
    } catch (error) {
        reject(error)
    }
})

export const updateTaskEngineerServices = (taskId, task_status, start_date, start_time, end_date, end_time) => new Promise(async (resolve, reject) => {
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
                    await createAppointmentServices(task.assign_to, null, "Sua chua", task.task_name, startTime, endTime, "engineer")
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