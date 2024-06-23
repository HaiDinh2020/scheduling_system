import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as maintenanceScheduleController from '../controllers/maintenanceSchedule'
import checkGarage from '../middlewares/checkGarage'

const router = express.Router()

router.use(verifyToken)

router.post('/', checkGarage,  maintenanceScheduleController.createMaintenaceSchedule)
router.get('/:maintenanceId', maintenanceScheduleController.getMaintenaceSchedule)
router.put('/:maintenanceId', checkGarage, maintenanceScheduleController.updateMaintenaceSchedule)
router.delete('/:maintenanceId', checkGarage, maintenanceScheduleController.deleteMaintenaceSchedule)


export default router;