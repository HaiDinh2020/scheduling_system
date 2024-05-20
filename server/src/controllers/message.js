import * as messageServices from '../services/message'
import * as userServices from '../services/user'

export const createMessage = async (req, res) => {
    try {
        const sender_id = req.user.id;
        const {receiver_id,content } = req.body
        
        const sender = await userServices.getCurrentProfileServices(sender_id)
        const receiver = await userServices.getCurrentProfileServices(receiver_id)

        if (!sender?.response || !receiver?.response) {
            return res.status(404).json({ err: 1, msg: 'User not found' });
        }

        if(!receiver_id || !content) {
            return res.status(400).json({
                err: 1,
                msg: "Missing content"
            })
        }

        const response = await messageServices.createMessageServices(sender_id, receiver_id, content)
        res.status(200).json(response)
    } catch (error) {
        console.log("error at controller message: " + error)
        res.status(500).json({
            err: -1,
            msg: "server error"
        })
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const userId = req.user.id;

        const response = await messageServices.getChatPartnersServices(userId)
        res.status(200).json(response)
    } catch (error) {
        console.log("error at controller message: " + error)
        res.status(500).json({
            err: -1,
            msg: "server error"
        })
    }
}

export const getMessagesBetweenUsers = async (req, res) => {
    try {
        const userId1 = req.user.id;
        const userId2 = req.params.userId2

        const response = await messageServices.getMessagesBetweenUsersServices(userId1, userId2)
        res.status(200).json(response)

    } catch (error) {
        console.log("error at controller message: " + error)
        res.status(500).json({
            err: -1,
            msg: "server error"
        })
    }
}