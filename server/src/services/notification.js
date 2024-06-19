import db from "../models"
import admin from '../config/configFirebaseAdmin'
require('dotenv').config()

export const sendNotiServices = (sentToUserId, titleNoti, bodyNoti) => new Promise(async (resolve, reject) => {
    try {

        const fcmToken = await db.FirebaseToken.findOne({
            where: {user_id: sentToUserId}
        })

        if(!fcmToken) {
            return reject("Receiver not found")
        }

        const response = await admin.messaging().send({
            notification: {
                title: titleNoti,
                body: bodyNoti
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                    },
                },
            },
            token: fcmToken.firebaseToken
        })
        console.log(response)

        resolve({
            err: 0,
            msg: "send noti successfull",
            response
        });
    } catch (error) {
        reject(error)
    }
})