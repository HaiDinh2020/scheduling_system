import db from "../models"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { v4 } from "uuid"
require('dotenv').config()

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const loginService = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email },
            raw: true
        })
        const isCorrectPassword = response && bcrypt.compareSync(password, response.password)

        const token = isCorrectPassword && jwt.sign({ id: response.id, email: response.email }, process.env.SECRET_KEY, { expiresIn: '2d' })
        resolve({
            err: token ? 0 : 2,
            msg: token ? "Login is successfully!" : response ? "Password is wrong !" : "Account is not registered!",
            token: token || null,
            role: response ? response.role : "Customer"
        })

    } catch (error) {
        reject(error)
    }
})

export const registerService = ({ name, phone, password, email, role, garageName, introduce, address, services, businessHours, linkWebsite }) => new Promise(async (resolve, reject) => {
    try {
        console.log(name, phone, password, garageName, introduce, address, services, businessHours, linkWebsite)
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                email,
                name,
                password: hashPassword(password),
                id: v4(),
                phone,
                role
            }
        })

        const token = response[1] && jwt.sign({ id: response[0].id, email: response[0].email }, process.env.SECRET_KEY, { expiresIn: '2d' })

        if(response[1] && role === 'garage') {
            const create_garage = await db.Garage.findOrCreate({
                where: {owner_id: response[0].id},
                defaults: {
                    id: v4(),
                    owner_id: response[0].id,
                    garage_name: garageName,
                    address,
                    introduce,
                    website: linkWebsite,
                    business_hours: businessHours,
                    services ,
                }
            })
            resolve({
                err: create_garage[1] ? 0 : 2,
                msg: create_garage[1] ? "Register is successfully!" : "Error whent create garage info",
                token: token || null
            })
        } else {
            resolve({
                err: token ? 0 : 2,
                msg: token ? "Register is successfully!" : "Email has been already used!",
                token: token || null
            })
        }

    } catch (error) {
        reject(error)
    }
})