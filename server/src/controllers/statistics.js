import * as StatServices from '../services/statistics';

export const statTaskTimer = async (req, res) => {
    try {
        const {garageId} = req.params
        const {mechanicId, startTime, endTime} = req.query
        console.log(startTime, endTime)
        const response = await StatServices.statTaskStatusTimerServices(garageId, mechanicId, startTime, endTime)
        return res.status(200).json(response);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail to get stat"
        })
    }
}

export const getRankingMechanic = async (req, res) => {
    try {
        const {garageId} = req.params
        
        const response = await StatServices.getRankingMechanicServices(garageId)
        return res.status(200).json(response);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail to get ranking"
        })
    }
}