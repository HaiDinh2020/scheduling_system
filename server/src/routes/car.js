import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as carController from '../controllers/car'
import { authorizeRoles } from '../middlewares/auth/authorizeRoles'
import { Role } from '../utils/role.enum'

const router = express.Router()

router.use(verifyToken)
router.post('/', carController.createCar)
router.get('/', authorizeRoles(Role.Customer), carController.getAllCar)
router.delete('/:carId', carController.deleteCar)

export default router;