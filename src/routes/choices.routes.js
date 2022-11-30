import {Router} from 'express';
import { createChoice } from '../controllers/choices.controllers.js';

const router = Router();

router.post("/choice", createChoice);

export default router;