import * as EngineerServices from '../services/engineer';

export const getAvailableEngineer = async (req, res) => {
    try {
        const garageId = req.params.garageId

        const response = await EngineerServices.findAvailableEngineerServices(garageId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to find available engineer ' + error,
        })
    }
}

export const getAllEngineer = async (req, res) => {
    try {
        const garageId = req.params.garageId

        const response = await EngineerServices.getAllEngineerServices(garageId)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to create schedule' + error,
        })
    }
}