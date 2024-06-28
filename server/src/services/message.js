import { Op } from "sequelize"
import db, { Sequelize, sequelize } from "../models"
import { v4 } from "uuid"


export const createMessageServices = (sender_id, receiver_id, content) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Message.create({
            id: v4(),
            sender_id,
            receiver_id,
            content,
            timestamp: new Date(),
        })
        // console.log("create mes " + response)
        if (!response) {
            reject("Send message fail")
        }
        resolve({
            err: 0,
            msg: "send message success",
            response
        })
    } catch (error) {
        reject(error)
    }
})


export const getChatPartnersServices = (userId) => new Promise(async (resolve, reject) => {
    try {
        const messages = await db.Message.findAll({
            raw: true,
            nest: true,
            where: {
                [Op.or]: [
                    { sender_id: userId },
                    { receiver_id: userId },
                ],
            },
            include: [
                { 
                    model: db.User, as: 'sender', attributes: ['id', 'name', 'avatar'], 
                    include: [{model: db.Garage, as: "garage", attributes: ['garage_name']}] 
                },
                { 
                    model: db.User, as: 'receiver', attributes: ['id', 'name', 'avatar'], 
                    include: [{model: db.Garage, as: "garage", attributes: ['garage_name']}] 
                },
            ],
        })

        const chatPartners = new Set();
        messages.forEach(message => {
            if (message.sender_id !== userId) {
                chatPartners.add(JSON.stringify(message.sender));
            }
            if (message.receiver_id !== userId) {
                chatPartners.add(JSON.stringify(message.receiver));
            }
        })

        const chatPartnersArray = Array.from(chatPartners).map(chatPartner => JSON.parse(chatPartner));

        resolve({
            err: 0,
            msg: "Get chat partners success",
            response: chatPartnersArray
        })
    } catch (error) {
        reject(error)
    }
})

export const getMessagesBetweenUsersServices = (userId1, userId2) => new Promise(async (resolve, reject) => {
    try {
        const messages = await db.Message.findAll({
            raw: true,
            nest: true,
            where: {
                [Op.or]: [
                    { sender_id: userId1, receiver_id: userId2 },
                    { sender_id: userId2, receiver_id: userId1 },
                ],
            },
            order: [['timestamp', 'ASC']],
            include: [
                { model: db.User, as: 'sender', attributes: ['id', 'name', 'avatar'] },
                { model: db.User, as: 'receiver', attributes: ['id', 'name', 'avatar'] },
            ],
        })
        resolve({
            err: 0,
            msg: "Get chat partners success",
            response: messages
        })
    } catch (error) {
        reject(error)
    }
})

