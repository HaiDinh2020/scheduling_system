import db from "../models"
require('dotenv').config()

import pool from '../config/connectDB'

export const getGarageInforServices = (userId) => new Promise(async(resolve, reject) => {
    try {
        const sql = `select garages.id, garage_name, address, introduce, website, business_hours, services, star, images, owner_id from garages, users  where garages.owner_id = users.id and users.id = '${userId}'`;
        pool.execute(sql, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                err: 0,
                msg: "success to get garage infor",
                response: result[0]
              });
            }
          });
    } catch (error) {
        reject(error)
    }
})

export const getGarageInforServicesV2 = (garageId) => new Promise(async(resolve, reject) => {
  try {
      const sql = `select id, garage_name, address, introduce, website, business_hours, services, star, images, owner_id from garages where id = '${garageId}'`;
      pool.execute(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              err: 0,
              msg: "success to get garage infor",
              response: result[0]
            });
          }
        });
  } catch (error) {
      reject(error)
  }
})

export const getAllGarageServices = () => new Promise(async(resolve, reject) => {
  try {
    const sql = `select * from garages`
    pool.execute(sql, (err, result) => {
      if(err) {
        reject(err)
      } else {
        resolve({
          err: 0,
          msg: "success to get all garage",
          response: result
        })
      }
    })
  } catch (error) {
    reject(error)
  }
})

export const updateGarageInforServices = (garageId, garage_name, address, introduce, website, business_hours, services, star, images) => new Promise(async(resolve, reject) => {
  try {
    const sql = `UPDATE garages SET garage_name = '${garage_name}', address = '${address}', introduce = '${introduce}', website = '${website}', business_hours = '${business_hours}', services = '${services}', star = '${star}', images = '${images}'
                WHERE id = '${garageId}'`
    pool.execute(sql, (err, result) => {
      if(err) {
        reject(err);
      } else {
        console.log(result)
        resolve({
          err: 0,
          msg: "success to update garage infor",
          response: result
        })
      }
    })
  } catch (error) {
    reject(error)
  }
})