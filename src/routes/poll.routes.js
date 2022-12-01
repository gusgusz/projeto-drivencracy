import {Router} from 'express';
import { sendPolls, CreatePoll, sendResult } from '../controllers/polls.controllers.js';
const router = Router();

router.get('/poll', sendPolls);
router.post('/poll', CreatePoll);
router.get('/poll/:id/result', sendResult);

export default router;