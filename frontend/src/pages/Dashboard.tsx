import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';

interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    currentSeason: number;
}

export const Dashboard = () => {
    const [leagues, setLeagues] = useState<League[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const VALID_LEAGUE_IDS = [39, 140, 78, 135, 61]; // Premier League, La Liga, Bundesliga, Serie A, Ligue 1

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await apiClient.get('/football/leagues');
                setLeagues(response.data);
            } catch (err: any) {
                setError('Failed to connect. Your session may have expired.');
            } finally {
                setLoading(false);
            }
        };

        fetchLeagues();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8 text-gray-900 font-sans">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Pitchside Stats</h1>
                <p className="text-gray-500 mt-2">Select a league to test your knowledge.</p>
            </header>

            {loading && <p className="text-amber-500 font-semibold animate-pulse">Loading arena data...</p>}
            {error && <p className="text-red-600 bg-red-50 p-4 rounded-md border border-red-100">{error}</p>}

            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leagues
                        .filter((league) => VALID_LEAGUE_IDS.includes(league.id))
                        .map((league) => (
                        <div
                            key={league.id}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between h-48 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-4">
                                <img src={league.logo} alt={league.name} className="w-12 h-12 object-contain" />
                                <div>
                                    <h2 className="text-xl font-semibold leading-tight">{league.name}</h2>
                                    <p className="text-sm text-gray-500 mt-1">{league.country}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    const season = 2022; // free tier
                                    navigate(`/quiz/${league.id}/${season}`);
                                }}
                                className="bg-black text-white px-4 py-2 rounded-md hover:bg-amber-400 hover:text-black font-semibold transition-colors mt-4"
                            >
                                Enter Arena
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};