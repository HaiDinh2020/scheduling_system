import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as bookingController from '../controllers/booking'

const router = express.Router()

router.use(verifyToken)
router.post('/customer', bookingController.createBooking)
router.get('/customer', bookingController.getAllBookingCustomer)
router.put('/garage/:bookingId', bookingController.updateStatusBooking)
router.get('/garage/:garageId', (req, res, next) => {
    if (req.query.status && req.query.status != "all") {
        return bookingController.getBookingStatus(req, res);
    } else {
        return bookingController.getAllBooking(req, res);
    }
})


export default router;