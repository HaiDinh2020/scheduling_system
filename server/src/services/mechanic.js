import { Op } from "sequelize"
import db, { Sequelize, sequelize } from "../models"

require('dotenv').config()


export const findAvailableMechanicServices = (garageId) => new Promise(async (resolve, reject) => {
    try {

        const mechanic = await db.Mechanic.findAll({
            where: {
                garage_id: garageId,
                [Op.and]: [
                    {
                        id: {
                            [Op.notIn]: Sequelize.literal(
                                `(SELECT mechanic_id FROM appointments WHERE startTime <= NOW() AND endTime >= NOW())`
                            )
                        }
                    }
                ]
            },
            raw: true,
            nest: true,
            include: [
                { model: db.User, as: 'user', attributes: ['name', 'phone'] }
            ],
            attributes: ['id', 'major']
        });

        if (mechanic !== null) {
            return resolve({
                err: 0,
                msg: "success to find available mechanic",
                response: mechanic
            });
        } else {
            return resolve({
                err: 1,
                msg: "There is no mechanic available now ",
                response: null
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const getAllMechanicServices = (garageId) => new Promise(async (resolve, reject) => {
    try {

        const mechanic = await db.Mechanic.findAll({
            where: {
                garage_id: garageId
            },
            raw: true,
            nest: true,
            include: [
                { model: db.User, as: 'user', attributes: ['name', 'phone'] }
            ],
            attributes: ['id', 'major']
        });


        return resolve({
            err: 0,
            msg: "success to find mechanic",
            response: mechanic
        });
    } catch (error) {
        reject(error)
    }
})