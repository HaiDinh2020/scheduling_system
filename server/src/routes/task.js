import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as taskController from '../controllers/task'

const router = express.Router()

router.use(verifyToken)

router.post('/',  taskController.createTask)
router.get('/:garageId', taskController.getTask)
router.put('/:taskId', taskController.updateTaskStatus)

export default router;