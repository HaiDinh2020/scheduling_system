import * as CarServices from '../services/car';

export const createCar = async (req, res) => {
    try {
        const owner_id = req.user.id
        const {make, model, year, number_plate, color} = req.body
        console.log(req.body)
        if(!make || !model || !number_plate) {
            return res.status(400).json({
                err:1,
                msg: "Missing input!"
            })
        }

        const response = await CarServices.createCarServices(make, model, year, number_plate, color, owner_id)
        return res.status(200).json(response);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail to create new car"
        })
    }
}

export const getAllCar = async (req, res) => {
    try {
        const owner_id = req.user.id
        
        if(!owner_id) {
            return res.status(400).json({
                err:1,
                msg: "Missing token!"
            })
        }

        const response = await CarServices.getCarAllServices(owner_id)
        return res.status(200).json(response);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail to get list car"
        })
    }
}

export const deleteCar = async (req, res) => {
    try {
        const carId = req.params.carId
        if(!carId) {
            return res.status(400).json({
                err: 1,
                msg: "Missing car_id"
            })
        }

        const response = await CarServices.deleteCar(carId)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail to delete this car"
        })
    }
}