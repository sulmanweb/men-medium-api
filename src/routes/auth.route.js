import {Router} from 'express'
import authController from '../controllers/auth.controllers'
import {authenticateUser} from '../lib/auth'

const router = Router();

router.post('/sign_up', authController.signUp);
router.post('/sign_in', authController.signIn);
router.delete('/sign_out', authenticateUser, authController.signOut);

export default router;