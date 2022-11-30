import {Router} from 'express';
import { createChoice, getChoices } from '../controllers/choices.controllers.js';

const router = Router();

router.post("/choice", createChoice);
router.get("/poll/:id/choice", getChoices);
export default router;