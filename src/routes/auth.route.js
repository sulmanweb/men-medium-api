import {Router} from 'express'
import authController from '../controllers/auth.controller'
import {authenticateUser} from '../lib/auth'

const router = Router();

router.post('/sign_up', authController.signUp);
router.post('/sign_in', authController.signIn);
router.delete('/sign_out', authenticateUser, authController.signOut);
router.get('/validate_token', authenticateUser, authController.validateToken);
router.put('/change_password', authenticateUser, authController.changePassword);

export default router;