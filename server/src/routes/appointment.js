import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as appointmentController from '../controllers/appointment'



const router = express.Router()

router.use(verifyToken)

// tạo appointment
router.post('/',  appointmentController.createAppointment)
router.get('/:mechanic_id', appointmentController.getAppointment)
// router.post('/mechanic', checkGarage, invoiceController.getInvoice)



export default router;