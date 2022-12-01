import {Router} from 'express';
import { createChoice, getChoices, voteChoice } from '../controllers/choices.controllers.js';

const router = Router();

router.post("/choice", createChoice);
router.get("/poll/:id/choice", getChoices);
router.post("/choice/:id/vote", voteChoice);
export default router;