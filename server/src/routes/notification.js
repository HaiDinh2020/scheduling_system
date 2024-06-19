import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as notiController from '../controllers/notification'
import admin from '../config/configFirebaseAdmin'

const notiRouter = express.Router()

// gửi noti bằng việc gọi tới router này
notiRouter.get("/notification", function(req, res, next) {
    admin.messaging().send({
        notification: {
            title: "thitle hello",
            body:" this is body"
        },
        apns: {
            payload: {
                aps: {
                    sound: 'default',
                },
            },
        },
        token: 'd-Mpy_p2Qof-G3m5NwXMIo:APA91bEpwvNjW6JqzsrpNeY11BN3TyHMt8Nx4gzRxnd8u40jBWfGt1OzWGzNqiF_WrviojIDFf_GJk-_OwgdbNpyII1qdmlj9EeycZfubtl4IaRVI9Y_86mc9FFwFu3QpvHyfI9AGkWx'
    })
    .then(res => console.log(JSON.stringify(res)))
    .catch(err => console.log(JSON.stringify(err)))
})

notiRouter.post("/notification", notiController.sendNoti)

export default notiRouter;