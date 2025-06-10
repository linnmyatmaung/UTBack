import { VoteLogController } from '@controllers/VoteLogController';
import { authenticateAdminToken, authenticatePinCodeToken } from '@middlewares/AuthMiddleware';
import { Router } from 'express';

const router = Router();

router.post('/',authenticatePinCodeToken , VoteLogController.insertVoteLog);
router.get('/', authenticateAdminToken , VoteLogController.getVoteCounts);

export default router;