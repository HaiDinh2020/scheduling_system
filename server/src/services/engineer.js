import { Op } from "sequelize"
import db, { Sequelize, sequelize } from "../models"

require('dotenv').config()


export const findAvailableEngineerServices = (garageId) => new Promise(async (resolve, reject) => {
    try {

        const engineer = await db.Engineer.findAll({
            where: {
                garage_id: garageId,
                [Op.and]: [
                    {
                        id: {
                            [Op.notIn]: Sequelize.literal(
                                `(SELECT engineer_id FROM appointments WHERE startTime <= NOW() AND endTime >= NOW())`
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

        if (engineer !== null) {
            return resolve({
                err: 0,
                msg: "success to find available engineer",
                response: engineer
            });
        } else {
            return resolve({
                err: 1,
                msg: "There is no engineer available now ",
                response: null
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const getAllEngineerServices = (garageId) => new Promise(async (resolve, reject) => {
    try {

        const engineer = await db.Engineer.findAll({
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
            msg: "success to find engineer",
            response: engineer
        });
    } catch (error) {
        reject(error)
    }
})