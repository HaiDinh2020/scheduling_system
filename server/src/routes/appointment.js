import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as appointmentController from '../controllers/appointment'
import { authorizeRoles } from '../middlewares/auth/authorizeRoles'

const {Role} = require('../utils/role.enum')

const router = express.Router()

router.use(verifyToken)
router.use(authorizeRoles(Role.Garage, Role.Mechanic))

// tạo appointment
router.post('/',  appointmentController.createAppointment)
router.get('/:mechanic_id', appointmentController.getAppointment)
router.put('/status/:appointmentId', appointmentController.changeStatusAppointment)
router.put('/:appointmentId', appointmentController.updateAppointment)
router.delete('/:appointmentId', appointmentController.deleteAppointment)



export default router;