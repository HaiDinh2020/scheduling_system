import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as invoiceDetailController from '../controllers/invoiceDetail'
import checkGarage from '../middlewares/checkGarage'


const router = express.Router()

router.use(verifyToken)

router.post('/garage/:invoiceId', checkGarage,  invoiceDetailController.createInvoiceDetail)

router.get('/garage/:invoiceId', checkGarage, invoiceDetailController.getInvoiceDetail)

router.put('/garage/:invoiceDetailId', checkGarage, invoiceDetailController.updateInvoiceDetail)
router.delete('/garage/:invoiceDetailId', checkGarage, invoiceDetailController.deleteInvoiceDetail)



export default router;