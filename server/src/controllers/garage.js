import * as garageServices from "../services/garage";

export const getInfor = async (req, res) => {
    try {
        const { id } = req.user

        const response = await garageServices.getGarageInforServices(id)
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }

}

export const getGarageInfor = async (req, res) => {
    try {
        const garageId  = req.params.garageId

        const response = await garageServices.getGarageInforServicesV2(garageId)
        return res.status(200).json(response);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }

}

export const getAllGarage = async (req, res) => {
    try {
        
        const response = await garageServices.getAllGarageServices()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail to get all garage" + error
        })
    }
}

export const updateGarageInfor = async (req, res) => {
    try {
        const { id } = req.user
        const { garage_name, address, introduce, website, business_hours, services, star, images} = req.body
        const garageId = req.body.id
       
        const response = await garageServices.updateGarageInforServices(garageId, garage_name, address, introduce, website, business_hours, services, star, images)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail to update garage" + error
        })
    }
}