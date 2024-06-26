import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as mechanicController from '../controllers/mechanic'
import checkIsGarage from '../middlewares/checkIsGarage'

const router = express.Router()

router.use(verifyToken)

// lấy danh sách thành viên rảnh
router.get("/available/:garageId", mechanicController.getAvailableMechanic)
router.get("/:garageId", mechanicController.getAllMechanic)

export default router;