import { where } from "sequelize";
import db from "../models";
import { v4 } from "uuid";

// done
export const createCarServices = (make, model, year, number_plate, color, owner_id) => new Promise(async (resolve, reject) => {
    try {
        var response = await db.Car.findOrCreate({
            where: { number_plate },
            defaults: {
                id: v4(),
                make,
                model,
                year,
                number_plate,
                color,
                owner_id,
            }
        })
        if (response[1]) {
            resolve({
                err: 0,
                msg: "Create new car successfully",
                response: response[0]
            })
        } else {
            resolve({
                err: 2,
                msg: "Car with similar license plate already exists"
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const getCarAllServices = (owner_id) => new Promise(async (resolve, reject) => {
    try {
        var response = await db.Car.findAll({
            where: { owner_id }
        })

        if (!response) {
            reject("Can't get data")
        }
        resolve({
            err: 0,
            msg: "success to get all car",
            response: response
        })

    } catch (error) {
        reject(error)
    }
})

export const deleteCar = ( carId) => new Promise(async(resolve, reject) => {
    try {
        var response = await db.Car.destroy({
            where: {
                id: carId
            }
        })
        console.log(response)
        resolve({
            err: 0,
            msg: "success to delete this car",
        })
    } catch (error) {
        reject(error)
    }
})