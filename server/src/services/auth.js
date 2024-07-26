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

        const token = isCorrectPassword && jwt.sign({ id: response.id, email: response.email, role: response.role }, process.env.SECRET_KEY, { expiresIn: '7d' })
        // const refreshToken = jwt.sign({ id: response.id, email: response.email, role: response.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: _CONF.refreshTokenLife})
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

export const registerService = ({ name, phone, password, email, role, garageName, introduce, garageAddress, services, businessHours, linkWebsite, exactAddress, garage_id, major }) => new Promise(async (resolve, reject) => {
    try {
        // console.log(name, phone, password, garageName, introduce, garageAddress, services, businessHours, linkWebsite, exactAddress)
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

        const token = response[1] && jwt.sign({ id: response[0].id, email: response[0].email }, process.env.SECRET_KEY, { expiresIn: '7d' })

        if (response[1] && role === 'garage') {
            const create_garage = await db.Garage.findOrCreate({
                where: { owner_id: response[0].id },
                defaults: {
                    id: v4(),
                    owner_id: response[0].id,
                    garage_name: garageName,
                    garageAddress,
                    exactAddress,
                    introduce,
                    website: linkWebsite,
                    business_hours: businessHours,
                    services,
                    latitude: exactAddress.split(", ")[0],
                    longitude: exactAddress.split(", ")[1]
                }
            })

            console.log(12)
            console.log(create_garage[1])
            if (!create_garage[1]) {
                // Xử lý trường hợp tạo garage không thành công
                await db.User.destroy({ where: { id: response[0].id } }); // Xóa user đã tạo
                return resolve({
                    err: 2,
                    msg: "Error when creating garage info",
                    token: null,
                    role: null
                });
            }

            return resolve({
                err: create_garage[1] ? 0 : 2,
                msg: create_garage[1] ? "Register is successfully!" : "Error whent create garage info",
                token: token || null,
                role: "garage"
            })
        } else if (response[1] && role === 'mechanic') {
            const create_mechanic = await db.Mechanic.findOrCreate({
                where: { user_id: response[0].id },
                defaults: {
                    id: v4(),
                    user_id: response[0].id,
                    garage_id: garage_id,
                    major: major
                }
            })



            if (!create_mechanic[1]) {
                await db.User.destroy({ where: { id: response[0].id } }); // Xóa user đã tạo
                return resolve({
                    err: 2,
                    msg: "Error when creating mechanic info",
                    token: null,
                    role: null
                });
            }

            return resolve({
                err: create_mechanic[1] ? 0 : 2,
                msg: create_mechanic[1] ? "Register is successfully!" : "Error whent create mechanic",
                token: token || null,
                role: "mechanic"
            })

        } else {
            resolve({
                err: token ? 0 : 2,
                msg: token ? "Register is successfully!" : "Email has been already used!",
                token: token || null,
                role: role
            })
        }

    } catch (error) {
        reject(error)
    }
})