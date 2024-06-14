import * as StatServices from '../services/statistics';

export const statTaskTimer = async (req, res) => {
    try {
        const {garageId} = req.params
        const {engineerId, startTime, endTime} = req.query
        console.log(startTime, endTime)
        const response = await StatServices.statTaskStatusTimerServices(garageId, engineerId, startTime, endTime)
        return res.status(200).json(response);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail to get stat"
        })
    }
}

export const getRankingEngineer = async (req, res) => {
    try {
        const {garageId} = req.params
        
        const response = await StatServices.getRankingEngineerServices(garageId)
        return res.status(200).json(response);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail to get ranking"
        })
    }
}