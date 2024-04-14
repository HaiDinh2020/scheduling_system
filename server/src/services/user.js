import db from "../models"
require('dotenv').config()

import pool from '../config/connectDB'


export const getCurrentProfileServices = (id) => new Promise(async (resolve, reject) => {
  try {
    const response = await db.User.findOne({
      where: { id },
      raw: true,
      attributes: {
        exclude: ['password']
      }
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
  return new Promise((resolve, reject) => {
    try {
      const sql = `UPDATE users SET name = '${name}', phone = '${phone}', email = '${email}', avatar = '${avatar}' WHERE id = '${id}'`;
      pool.execute(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            err: 0,
            msg: "Success to update profile",
            response: result
          });
        }
      });
    } catch (error) {
      reject(error)
    }
  });
};
