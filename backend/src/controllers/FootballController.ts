import { Request, Response, NextFunction } from 'express';
import { FootballService } from '../services/FootballService';

export class FootballController {
    private footballService: FootballService;

    constructor() {
        this.footballService = new FootballService();
    }

    // Handles GET /api/football/team/:id

    getTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const teamId = parseInt(<string>req.params.id, 10);

            if (isNaN(teamId)) {
                res.status(400).json({ error: "Team ID must be a valid number"});
                return;
            }

            const teamData = await this.footballService.getTeamInfo(teamId);
            res.status(200).json(teamData);
        } catch (error) {
            next(error);
        }
    }

    getLeagues = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const leagues = await this.footballService.getTopLeagues();
            res.status(200).json(leagues);
        } catch (error) {
            next(error);
        }
    };

    getStandings = async  (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const leagueId = parseInt(<string>req.params.leagueId, 10);
            const season = parseInt(<string>req.params.season, 10);

            if (isNaN(leagueId) || isNaN(season)) {
                res.status(400).json({ error: "League ID and Season must be valid numbers" });
                return;
            }

            const standings = await this.footballService.getStandings(leagueId, season);
            res.status(200).json(standings);
        } catch (error) {
            next(error);
        }
    };

    getTopScorers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const leagueId = parseInt(<string>req.params.leagueId, 10);
            const season = parseInt(<string>req.params.season, 10);

            if (isNaN(leagueId) || isNaN(season)) {
                res.status(400).json({ error: "League ID and Season must be valid numbers" });
                return;
            }

            const scorers = await this.footballService.getTopScorers(leagueId, season);
            res.status(200).json(scorers);
        } catch (error) {
            next(error);
        }
    };

}