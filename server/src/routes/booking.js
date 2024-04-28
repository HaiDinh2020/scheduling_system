import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as bookingController from '../controllers/booking'

const router = express.Router()

router.use(verifyToken)
router.post('/customer', bookingController.createBooking)
router.put('/garage/:bookingId', bookingController.updateStatusBooking)
router.get('/garage/:garageId', bookingController.getAllBooking)

export default router;