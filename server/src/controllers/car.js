import * as CarServices from '../services/car';

export const createCar = async (req, res) => {
    try {
        const owner_id = req.user.id
        const {make, model, number_plate, car_images} = req.body
        console.log(req.body)
        if(!make || !model || !number_plate) {
            return res.status(400).json({
                err:1,
                msg: "Missing input!"
            })
        }

        const response = await CarServices.createCarServices(make, model, number_plate, owner_id, car_images)
        return res.status(200).json(response);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail to create new car"
        })
    }
}