import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as statController from '../controllers/statistics'

const router = express.Router()

router.use(verifyToken)

router.get('/:garageId', statController.statTaskTimer)
router.get('/:garageId/ranking', statController.getRankingMechanic)


export default router;