import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as bookingController from '../controllers/booking'
import checkIsGarage from '../middlewares/checkIsGarage'
import { authorizeRoles } from '../middlewares/auth/authorizeRoles'
import { Role } from '../utils/role.enum'

const router = express.Router()

router.use(verifyToken)
router.post('/customer', authorizeRoles(Role.Garage), bookingController.createBooking)
router.post('/customer/maintenance', bookingController.createBookingMaintenance)
router.get('/customer', bookingController.getAllBookingCustomer)
router.delete('/customer/:bookingId', bookingController.cancelBooking)

router.put("/garage/request/:bookingGarageId", bookingController.respondToBooking)
router.put('/garage/:bookingId', bookingController.updateStatusBooking)

router.get('/garage/request/:garageId', bookingController.getBookingRequest)
router.get('/garage/:garageId', (req, res, next) => {
    if (req.query.status && req.query.status != "all") {
        return bookingController.getBookingStatus(req, res);
    } else {
        return bookingController.getAllBooking(req, res);
    }
})

router.get("/test", bookingController.testFindNearestGarages)

export default router;