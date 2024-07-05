import db from '../models';
import * as AppointmentServices from '../services/appointment';
import { validateStartTimeEndTime } from '../validators/Validator';

export const createAppointment = async (req, res) => {
    try {
        const createBy = req.user.role
        const { mechanic_id, title, description, startTime, endTime } = req.body;
        if (createBy === "customer") {
            const startTimeDate = new Date(startTime);
            startTimeDate.setHours(startTimeDate.getHours() + 1);
            endTime = startTimeDate;
        }

        // check body miss
        if (!mechanic_id || !title || !startTime || !createBy) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input!"
            })
        }

        if (endTime) {
            if (!validateStartTimeEndTime(startTime, endTime)) {
                return res.status(400).json({
                    err: 1,
                    msg: "EndTime must be greater than StartTime."
                })
            }
        }

        const mechanic = await db.Mechanic.findOne({ where: { id: mechanic_id } })
        if (!mechanic)
            return res.status(404).json({
                err: 1,
                msg: "Mechanic not found"
            })

        const response = await AppointmentServices.createAppointmentServices(mechanic_id, null, title, description, startTime, endTime, 'todo', createBy)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to create appointment ' + error,
        })
    }
}

export const getAppointment = async (req, res) => {
    try {
        const { mechanic_id } = req.params

        const mechanic = await db.Mechanic.findOne({ where: { id: mechanic_id } })
        if (!mechanic)
            return res.status(404).json({
                err: 1,
                msg: "Mechanic not found"
            })

        const response = await AppointmentServices.GetAppointmentServices(mechanic_id)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to get appointment ' + error,
        })
    }
}

export const updateAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params
        const { title, description } = req.body

        const response = await AppointmentServices.UpdateAppointmentServices(appointmentId, title, description)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to get appointment ' + error,
        })
    }
}

export const changeStatusAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params
        const { status } = req.body

        const response = await AppointmentServices.changeStatusAppointmentServices(appointmentId, status)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to get appointment ' + error,
        })
    }
}

export const deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params
    
        const response = await AppointmentServices.deleteAppointmentServices(appointmentId)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to get appointment ' + error,
        })
    }
}