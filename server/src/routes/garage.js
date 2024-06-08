import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as garageController from '../controllers/garage'

const router = express.Router()

router.get('/:garageId/infor', garageController.getGarageInfor)
router.get('/', garageController.getAllGarage)
router.use(verifyToken)
router.get('/infor', garageController.getInfor)
router.put('/infor', garageController.updateGarageInfor)
router.get('/:garageId/engineers', garageController.getAllEngineer)


export default router;