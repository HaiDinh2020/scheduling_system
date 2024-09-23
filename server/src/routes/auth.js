import express from 'express';
import * as authController from '../controllers/auth.js'
import { asyncHandle } from '../middlewares/auth/checkAuth.js';

const router = express.Router()

router.post('/login', authController.login)
router.post('/register', asyncHandle(authController.register))
router.get('/token', authController.refreshToken)
export default router;