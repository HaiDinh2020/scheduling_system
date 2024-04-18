import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as garageControlelr from '../controllers/garage'

const router = express.Router()

router.use(verifyToken)
router.get('/garage/infor', garageControlelr.getInfor)
// router.put('/update-profile', userController.updateProfile)

export default router;