import db from "../models"
require('dotenv').config()

import pool from '../config/connectDB'

export const getGarageInfor = (userId) => new Promise(async(resolve, reject) => {
    try {
        const sql = `select * from garages, users  where garages.owner_id = users.id and users.id = '${userId}'`;
        pool.execute(sql, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                err: 0,
                msg: "success to get garage infor",
                response: result
              });
            }
          });
    } catch (error) {
        reject(error)
    }
})