import * as NotiServices from '../services/notification';

export const sendNoti = async (req, res) => {
    try {

        const {sentToUserId, titleNoti, bodyNoti} = req.body

        if(!sentToUserId) {
            return res.status(401).json({
                err: 1,
                msg: "Missing receiver"
            })
        }

        const response = await NotiServices.sendNotiServices(sentToUserId, titleNoti, bodyNoti)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            err: -1,
            msg: 'Fail to sent noti' + error,
        })
    }
}