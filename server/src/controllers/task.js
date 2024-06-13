import db from '../models';
import * as TaskServices from '../services/task';
import { validateStartTimeEndTime } from '../validators/Validator';

export const createTask = async (req, res) => {
    try {
        const { task_name, garage_id, assign_to, level, task_status, allocation_date, estimated_time, start_date, start_time, end_date, end_time } = req.body;

        // complete_at = complete_at !== undefined ? complete_at : null;
        // const assignAtValue = req.body.assign_at !== undefined ? assign_at : null;
        // const assignToValue = req.body.assign_to !== undefined ? assign_to : null;

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