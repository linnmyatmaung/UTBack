import { PinCodeController } from '@controllers/PinCodeController';
import { authenticateAdminToken, authenticatePinCodeToken } from '@middlewares/AuthMiddleware';
import { Router } from 'express';

const router = Router();

router.post('/:code',authenticateAdminToken , PinCodeController.createPinCode);
router.get('/status',authenticatePinCodeToken , PinCodeController.getPinCodeStatus);

export default router;