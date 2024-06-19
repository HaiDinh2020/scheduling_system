import * as FirebaseTokeServices from '../services/firebaseToken';

export const createFirebaseToken = async (req, res) => {
    try {
        
        const {userId, fcmtoken} = req.body
        console.log(req.body)
        if(!fcmtoken) {
            return res.status(400).json({
                err:1,
                msg: "Missing fcmtoken!"
            })
        }

        if(!userId) {
            return res.status(400).json({
                err:1,
                msg: "Missing userId!"
            })
        }

        const response = await FirebaseTokeServices.createFirebaseTokenServices(userId, fcmtoken)
        return res.status(200).json(response);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: -1,
            msg: "Fail to insert fcmtoken to db",
            err: error
        })
    }
}
