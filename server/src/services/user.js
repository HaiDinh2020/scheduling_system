import db from "../models"
require('dotenv').config()

import pool from '../config/connectDB'
import { Op } from "sequelize"


export const getCurrentProfileServices = (id) => new Promise(async (resolve, reject) => {
  try {
    const response = await db.User.findOne({
      where: { id },
      raw: true,
      nest: true,
      attributes: {
        exclude: ['password']
      },
      include: [
        { model: db.Mechanic, as: 'mechanic', attributes: ['id', 'garage_id', 'major'] },
      ]
    })

    resolve({
      err: response ? 0 : 1,
      msg: response ? "Ok" : "Fail to get profile !",
      response
    })

  } catch (error) {
    reject(error)
  }
})

export const updateProfileServices = async (id, name, phone, email, avatar) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkEmail = await db.User.findOne({
        where: {
          email,
          id: {
            [Op.not]: id
          }
        }
      })
      if (checkEmail) {
        return resolve({
          err: 1,
          msg: "Email invalid",
        });
      }
      const user = await db.User.findOne({where: {id: id}})
      if(!user) {
        return reject("User không tồn tại")
      } else {
        await user.update({name, phone, email, avatar})
        resolve({
          err: 0,
          msg: "Success to update profile",
          response: user
        });

      }
      // const sql = `UPDATE users SET name = '${name}', phone = '${phone}', email = '${email}', avatar = '${avatar}' WHERE id = '${id}'`;
      // pool.execute(sql, (err, result) => {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     resolve({
      //       err: 0,
      //       msg: "Success to update profile",
      //       response: result
      //     });
      //   }
      // });
    } catch (error) {
      reject(error)
    }
  });
};

export const getAllGarageHaveBeenRepairServices = async (userId) => new Promise(async (resolve, reject) => {
  try {

    const sql = `SELECT DISTINCT g.id, g.garage_name, g.garageAddress
                FROM users u
                JOIN bookings b ON u.id = b.customer_id
                JOIN invoices i ON b.id = i.booking_id
                JOIN garages g ON i.garage_id = g.id
                WHERE u.id ='${userId}'
                `;
    pool.execute(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          err: 0,
          msg: "get garages have been repair success",
          response: result
        });
      }
    });
  } catch (error) {
    reject(error)
  }
});
