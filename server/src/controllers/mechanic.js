import * as MechanicServices from '../services/mechanic';

export const getAvailableMechanic = async (req, res) => {
    try {
        const garageId = req.params.garageId

        const response = await MechanicServices.findAvailableMechanicServices(garageId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to find available mechanic ' + error,
        })
    }
}

export const getAllMechanic = async (req, res) => {
    try {
        const garageId = req.params.garageId

        const response = await MechanicServices.getAllMechanicServices(garageId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to create schedule' + error,
        })
    }
}