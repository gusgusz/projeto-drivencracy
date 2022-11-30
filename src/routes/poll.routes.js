import {Router} from 'express';
import { sendPolls, CreatePoll } from '../controllers/polls.controllers.js';
const router = Router();

router.get('/poll', sendPolls);
router.post('/poll', CreatePoll);

export default router;