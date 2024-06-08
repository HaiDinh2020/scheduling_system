import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as engineerController from '../controllers/engineer'
import checkIsGarage from '../middlewares/checkIsGarage'

const router = express.Router()

router.use(verifyToken)

// lấy danh sách thành viên rảnh
router.get("/available/:garageId", engineerController.getAvailableEngineer)
router.get("/:garageId", engineerController.getAllEngineer)

export default router;