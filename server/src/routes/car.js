import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as carController from '../controllers/car'

const router = express.Router()

router.use(verifyToken)
router.post('/', carController.createCar)



export default router;