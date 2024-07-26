import db from "../models"
require('dotenv').config()

import pool from '../config/connectDB'

export const getGarageInforServices = (userId) => new Promise(async (resolve, reject) => {
  try {
    const response = await db.Garage.findOne({
      where: {owner_id: userId}
    })
    console.log("request here")
    resolve({
      err: 0,
      msg: "success to get garage infor",
      response: response
    });
    // const sql = `select garages.id, garage_name, garageAddress, introduce, website, business_hours, services, score, images, owner_id from garages, users  where garages.owner_id = users.id and users.id = '${userId}'`;
    // pool.execute(sql, (err, result) => {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve({
    //       err: 0,
    //       msg: "success to get garage infor",
    //       response: result[0]
    //     });
    //   }
    // });
  } catch (error) {
    reject(error)
  }
})

export const getGarageInforServicesV2 = (garageId) => new Promise(async (resolve, reject) => {
  try {
    const response = await db.Garage.findOne({
      where: {id: garageId}
    })
    console.log("request here 2")
    resolve({
      err: 0,
      msg: "success to get garage infor",
      response: response
    });
    // const sql = `select id, garage_name, garageAddress, introduce, website, business_hours, services, score, images, owner_id from garages where id = '${garageId}'`;
    // pool.execute(sql, (err, result) => {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve({
    //       err: 0,
    //       msg: "success to get garage infor",
    //       response: result[0]
    //     });
    //   }
    // });
  } catch (error) {
    reject(error)
  }
})

// done
export const getAllGarageServices = () => new Promise(async (resolve, reject) => {
  try {
    const response = await db.Garage.findAll({
      raw: true,
      nest: true,
      include: [
        { model: db.User, as: 'user', attributes: ['name', 'phone', 'avatar'] },
      ]
    })

    if (!response) {
      reject(err)
    }
    resolve({
      err: 0,
      msg: "success to get all garage",
      response: response
    })
  } catch (error) {
    reject(error)
  }
})

export const updateGarageInforServices = (garageId, garage_name, garageAddress, introduce, website, business_hours, services, score, images) => new Promise(async (resolve, reject) => {
  try {
    const garage = await db.Garage.findOne({
      where: {id: garageId}
    })

    if(!garage) {
      return reject("Không tìm thấy garage")
    } else {
      await garage.update({
        garage_name,
        garageAddress,
        introduce,
        website,
        business_hours,
        services,
        score,
        images
      });
      resolve({
        err: 0,
        msg: "success to update garage infor",
        response: garage
      })
    }

    // const sql = `UPDATE garages SET garage_name = '${garage_name}', garageAddress = '${garageAddress}', introduce = '${introduce}', website = '${website}', business_hours = '${business_hours}', services = '${services}', score = '${score}', images = '${images}'
    //             WHERE id = '${garageId}'`
    // pool.execute(sql, (err, result) => {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     console.log(result)
    //     resolve({
    //       err: 0,
    //       msg: "success to update garage infor",
    //       response: result
    //     })
    //   }
    // })
  } catch (error) {
    reject(error)
  }
})

// new

export const getAllMechanicServices = (garage_id) => new Promise(async (resolve, reject) => {
  try {
    const mechanics = await db.Garage.findAll({
      where: {id: garage_id},
      include: [
        {
          model: db.Mechanic,  
          as: 'mechanics',
          attributes: ['id', 'major'],
          include: [
            {model: db.User, as: 'user', attributes: ['name', 'phone']}
          ]
        }
      ]
    })
    resolve({
      err: 0,
      msg: "Get mechanic of garage success",
      response: mechanics
    })
  } catch (error) {
    reject(error)
  }
})