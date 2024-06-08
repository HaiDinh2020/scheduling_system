import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as userController from '../controllers/user'

const router = express.Router()

router.post('/users', userController.getUsers)
router.use(verifyToken)
router.get('/get-current-profile', userController.getCurrentProfile)
router.put('/update-profile', userController.updateProfile)
router.get('/get-garage', userController.getAllGarageHaveBeenRepair)

export default router;