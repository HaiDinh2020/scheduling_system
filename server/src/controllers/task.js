import db from '../models';
import * as TaskServices from '../services/task';
import { validateStartTimeEndTime } from '../validators/Validator';

export const createTask = async (req, res) => {
    try {
        const { task_name, garage_id, assign_to, level, task_status, allocation_date, estimated_time, start_date, start_time, end_date, end_time } = req.body;


        const response = await TaskServices.createTaskServices(task_name, garage_id, assign_to, level, task_status, allocation_date, estimated_time, start_date, start_time, end_date, end_time )
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to create task ' + error,
        })
    }
}

export const getTask = async (req, res) => {
    try {
        const garage_id  = req.params.garageId;

        const response = await TaskServices.getTaskServices(garage_id )
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to get task ' + error,
        })
    }
}

export const updateTaskStatus = async (req, res) => {
    try {
        const task_id = req.params.taskId
        const { level, task_status, estimated_time, assign_to, allocation_date, start_date, start_time, end_date, end_time } = req.body

        console.log(req.body)

        const response = await TaskServices.updateTaskServices(task_id, level, task_status, estimated_time, assign_to, allocation_date, start_date, start_time, end_date, end_time)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to update task ' + error,
        })
    }
}

// phía engineer
export const getTaskEngineer = async (req, res) => {
    try {
        const engineerId = req.params.engineerId
        console.log(engineerId)
        const response = await TaskServices.getTaskEngineerServices(engineerId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to get task: ' + error,
        })
    }
}

export const updateTaskEngineer = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const { task_status, start_date, start_time, end_date, end_time} = req.body
        console.log(req.body)

        // need updated: check missing input
        // if(task_status !== "completed" || !end_date || !end_time) {
        //     return res.status(400).json({
        //         err: 1,
        //         msg: "Missing input"
        //     })
        // }

        const response = await TaskServices.updateTaskEngineerServices(taskId, task_status, start_date, start_time, end_date, end_time)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to get task: ' + error,
        })
    }
}