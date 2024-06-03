import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as firebaseTokenController from '../controllers/firebaseToken'

const router = express.Router()

router.post('/save-token', firebaseTokenController.createFirebaseToken)

export default router;