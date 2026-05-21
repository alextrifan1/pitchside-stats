import { Router } from 'express';
import { FootballController } from '../controllers/FootballController';

const router = Router();
const footballController = new FootballController();

router.get('/team/:id', footballController.getTeam);

export default router