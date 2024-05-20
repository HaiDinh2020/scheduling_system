import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as messageController from '../controllers/message'


const messageRouter = express.Router()

messageRouter.use(verifyToken)
messageRouter.post("/send", messageController.createMessage)
messageRouter.get("", messageController.getChatPartners)
messageRouter.get("/:userId2", messageController.getMessagesBetweenUsers)

export default messageRouter;

