import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as messageController from '../controllers/message'
import admin from '../config/configFirebaseAdmin'

const notiRouter = express.Router()

// gửi noti bằng việc gọi tới router này
notiRouter.get("/notification", function(req, res, next) {
    console.log("abc")
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
        token: 'fQPUqdnfHGGebUbGyLOLSZ:APA91bFy0hMV-VJd-glTxefTDOfl5GJf1vw9sEsZqp_5CtmZZU7Bo84CuVOWnU-D_xRDV_yi1E717D5MxQ0ijKRoRoMT5LiLy3BQJv_5gXq1zBZanUvf388cOfP5y_WgADbel8lymSjk'
    })
    .then(res => console.log(JSON.stringify(res)))
    .catch(err => console.log(JSON.stringify(err)))
})

export default notiRouter;