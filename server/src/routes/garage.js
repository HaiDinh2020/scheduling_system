import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as garageControlelr from '../controllers/garage'

const router = express.Router()

router.use(verifyToken)
router.get('/infor', garageControlelr.getInfor)
router.put('/infor', garageControlelr.updateGarageInfor)
// router.put('/update-profile', userController.updateProfile)

export default router;