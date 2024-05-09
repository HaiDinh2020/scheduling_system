import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as carController from '../controllers/car'

const router = express.Router()

router.use(verifyToken)
router.post('/', carController.createCar)
router.get('/', carController.getAllCar)
router.delete('/:carId', carController.deleteCar)

export default router;