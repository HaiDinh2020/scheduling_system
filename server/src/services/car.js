import db from "../models";
import { v4 } from "uuid";

export const createCarServices = (make, model, number_plate, owner_id, car_images) => new Promise(async(resolve, reject) => {
    try {
        var response = await db.Car.findOrCreate({
            where: {number_plate},
            defaults: {
                id: v4(),
                make,
                model,
                number_plate,
                owner_id,
                car_images
            }
        })
        if(response[1]) {
            resolve({
                err: 0,
                msg: "Create new car successfully",
            })
        } else {
            resolve({
                err: 2,
                msg:"Car with similar license plate already exists"
            })
        }
    } catch (error) {
        reject(error)
    }
})