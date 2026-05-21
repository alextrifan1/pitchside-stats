import axios from 'axios';

export class FootballService {
    private readonly apiKey: string;
    private readonly baseUrl = 'https://v3.football.api-sports.io';

    constructor() {
        this.apiKey = process.env.API_FOOTBALL_KEY || '';
        if (!this.apiKey) {
            console.warn("WARNING: API_FOOTBALL_KEY is missing from environment variables.");
        }
    }

    private getHeaders() {
        return {
            'x-apisports-key': this.apiKey
        };
    }

    async getTeamInfo(teamId: number): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/teams`, {
                headers: this.getHeaders(),
                params: { id: teamId }
            });

            const teamData = response.data.response[0];

            if (!teamData) {
                throw new Error(`Team with ID ${teamId} not found`);
            }

            return {
                id: teamData.team.id,
                name: teamData.team.name,
                logo: teamData.team.logo,
                founded: teamData.team.founded,
                stadiumName: teamData.venue.name,
                stadiumCapacity: teamData.venue.capacity,
            };

        } catch (error: any) {
            console.error("External API Error:", error.message);
            throw new Error("Failed to fetch team data from API-Football");
        }
    }
}