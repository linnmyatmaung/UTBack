import { AuthController } from '@controllers/AuthController';
import { Router } from 'express';

const router = Router();

router.post('/Plogin', AuthController.PinCodeLogin);
router.post('/Alogin', AuthController.AdminLogin);

export default router;