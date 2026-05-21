import { Request, Response, NextFunction } from 'express';
import { FootballService } from '../services/FootballService';

export class FootballController {
    private footbalService: FootballService;

    constructor() {
        this.footbalService = new FootballService();
    }

    // Handles GET /api/football/team/:id

    getTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const teamId = parseInt(<string>req.params.id, 10);

            if (isNaN(teamId)) {
                res.status(400).json({ error: "Team ID must be a valid number"});
                return;
            }

            const teamData = await this.footbalService.getTeamInfo(teamId);
            res.status(200).json(teamData);
        } catch (error) {
            next(error);
        }

    }

}