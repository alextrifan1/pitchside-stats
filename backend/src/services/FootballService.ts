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

    async getTopLeagues(): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/leagues`, {
                headers: this.getHeaders(),
                params: { current: 'true', type: 'league'}
            });

            return response.data.response.map((item:any) => ({
                id:item.league.id,
                name: item.league.name,
                country: item.league.country,
                logo: item.league.logo,
                curremtSeason: item.seasons[0].year
            }));
        } catch (error: any) {
            console.error("External API Error (/leagues):", error.message);
            throw new Error("Failed to fetch leagues");
        }
    }

    async getStandings(leagueId: number, season: number): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/standings`, {
                headers: this.getHeaders(),
                params: { league: leagueId, season: season}
            });

            const standingsData = response.data.response[0]?.league?.standings[0];
            if (!standingsData) {
                throw new Error("Standings not found for this league/season");
            }

            return standingsData.map((teamRank: any) => ({
                rank: teamRank.rank,
                teamId: teamRank.team.id,
                teamName: teamRank.team.name,
                teamLogo: teamRank.team.logo,
                points: teamRank.points,
                isChampion: teamRank.rank === 1 // will use for quiz logic
            }));
        } catch (error: any) {
            console.error("External API Error (/standings):", error.message);
            throw new Error("Failed to fetch standings");
        }
    }

    async getTopScorers(leagueId: number, season: number): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/players/topscorers`, {
                headers: this.getHeaders(),
                params: { league: leagueId, season: season }
            });

            return response.data.response.map((playerInfo: any) => ({
                playerId: playerInfo.player.id,
                name: playerInfo.player.name,
                photo: playerInfo.player.photo,
                teamName: playerInfo.statistics[0].team.name,
                goals: playerInfo.statistics[0].goals.total
            }));
        } catch (error: any) {
            console.error("External API Error (/topscorers):", error.message);
            throw new Error("Failed to fetch top scorers");
        }
    }
}