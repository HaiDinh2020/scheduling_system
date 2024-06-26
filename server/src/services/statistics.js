
import db, { Sequelize, sequelize } from "../models"
import pool from '../config/connectDB'
import { Op } from "sequelize";
import { response } from "express";

// statitic task

export const statTaskStatusTimerServices = (garage_id, mechanic_id, startTime, endTime) => new Promise(async (resolve, reject) => {
    try {

        const whereClause = {
            garage_id: garage_id
        };

        if (mechanic_id !== undefined) {
            whereClause.assign_to = mechanic_id;
        }

        if (startTime !== undefined && endTime !== undefined) {
            whereClause.allocation_date = {
                [Op.between]: [startTime, endTime]
            };
        }
        const taskCounts = await db.Task.findAll({
            where: whereClause,
            attributes: [
                'task_status',
                [Sequelize.fn('COUNT', 'id'), 'count']
            ],
            group: ['task_status']
        })
        const counts = taskCounts.reduce((accumulator, current) => {
            accumulator[current.task_status] = current.dataValues.count;
            return accumulator;
        }, {});
        resolve({
            err: 0,
            msg: "success to get task of garage",
            response: counts
        });
    } catch (error) {
        reject(error)
    }
})

export const getRankingMechanicServices = (garage_id) => new Promise(async (resolve, reject) => {
    try {
        const tasks = await db.Task.findAll({ where: { garage_id: garage_id } });
        const mechanics = await db.Mechanic.findAll({ where: { garage_id: garage_id } });
        let mechanicScores = {};

        mechanics.forEach(mechanic => {
            mechanicScores[mechanic.id] = { score: 0, easy: 0, medium: 0, hard: 0 };
        })

        tasks.forEach((task) => {
            if (task.task_status === "completed") {
                const levelScore = {
                    easy: 1,
                    medium: 2,
                    hard: 3
                };

                mechanicScores[task.assign_to].score += 1 + levelScore[task.level];

                mechanicScores[task.assign_to][task.level] += 1;
            }
        })

        const sortedMechanics = Object.keys(mechanicScores).map(mechanicId => {
            return {
                id: mechanicId,
                score: mechanicScores[mechanicId].score,
                easy: mechanicScores[mechanicId].easy,
                medium: mechanicScores[mechanicId].medium,
                hard: mechanicScores[mechanicId].hard
            };
        });

        sortedMechanics.sort((a, b) => b.score - a.score);

        resolve({
            err: 0,
            msg: "success to get ranking",
            response: sortedMechanics
        })
    } catch (error) {
        reject(error)
    }
})