import db from '../models';
import * as MaintenanceScheduleServices from '../services/maintenanceSchedule';

export const createMaintenaceSchedule = async (req, res) => {
    try {
        const { booking_id, maintenanceTime, note } = req.body

        // check body miss
        if (!booking_id || !maintenanceTime || !note) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input!"
            })
        }

        const response = await MaintenanceScheduleServices.createMaintenaceScheduleServices(booking_id, maintenanceTime, note)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to create schedule ' + error,
        })
    }
}

export const getMaintenaceSchedule = async (req, res) => {
    try {
        const { maintenanceId } = req.params

        if (!maintenanceId) {
            return res.status(400).json({
                err: 1,
                msg: "Missing id!"
            })
        }

        const response = await MaintenanceScheduleServices.getMaintenaceScheduleServices(maintenanceId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to get schedule ' + error,
        })
    }
}

export const updateMaintenaceSchedule = async (req, res) => {
    try {
        const { maintenanceId } = req.params
        const { maintenanceTime, note } = req.body

        if (!maintenanceId || !maintenanceTime || !note) {
            return res.status(400).json({
                err: 1,
                msg: "Missing data!"
            })
        }

        const response = await MaintenanceScheduleServices.updateMaintenaceScheduleServices(maintenanceId, maintenanceTime, note)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to update schedule ' + error,
        })
    }
}

export const deleteMaintenaceSchedule = async (req, res) => {
    try {
        const { maintenanceId } = req.params

        if (!maintenanceId) {
            return res.status(400).json({
                err: 1,
                msg: "Missing id!"
            })
        }

        const response = await MaintenanceScheduleServices.deleteMaintenaceScheduleServices(maintenanceId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to delete schedule ' + error,
        })
    }
}

export const checkMaintenanceSchedule = async (req, res) => {
    try {
        const { garageId } = req.params
        const number_plate = req.query.number_plate

        console.log(garageId)
        console.log(number_plate)
        if (!number_plate) {
            return res.status(400).json({
                err: 1,
                msg: "Missing input!"
            })
        }


        const response = await MaintenanceScheduleServices.checkMaintenanceScheduleServices(garageId, number_plate)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: error,
        })
    }
}