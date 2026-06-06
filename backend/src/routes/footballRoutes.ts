import { Router } from 'express';
import { FootballController } from '../controllers/FootballController';
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();
const footballController = new FootballController();

router.use(requireAuth);

router.get('/team/:id', footballController.getTeam);
router.get('/leagues', footballController.getLeagues);
router.get('/standings/:leagueId/:season', footballController.getStandings);
router.get('/topscorers/:leagueId/:season', footballController.getTopScorers);

export default router