import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as invoiceController from '../controllers/invoice'
import checkGarage from '../middlewares/checkGarage'


const router = express.Router()

router.use(verifyToken)

// tạo 1 hóa đơn
router.post('/garage/', checkGarage,  invoiceController.createInvoice)
router.get('/garage/:invoiceId', checkGarage, invoiceController.getInvoice)

// garage
router.put('/garage/:invoiceId', checkGarage, invoiceController.updateInvoice)



export default router;