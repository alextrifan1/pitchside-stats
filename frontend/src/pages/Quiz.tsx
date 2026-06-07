import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';

interface Team {
    teamId: number;
    teamName: string;
    teamLogo: string;
    rank: number;
    isChampion?: boolean;
}

export const Quiz = () => {
    const {leagueId, season} = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState<Team[]>([]);
    const [correctTeam, setCorrectTeam] = useState<Team | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    useEffect(() => {
        const generateQuestion = async () => {
            try {
                const targetSeason = season || "2021"
                const response = await apiClient.get(`/football/standings/${leagueId}/${targetSeason}`);
                const standings: Team[] = response.data;

                const champion = standings.find(t => t.isChampion) || standings.find(t => t.rank === 1);

                if (!champion) throw new Error("Could not find a champion in this data.");

                const wrongAnswers = standings
                    .filter(t => t.teamId !== champion.teamId)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);

                const finalOptions = [...wrongAnswers, champion].sort(() => 0.5 - Math.random());
                setCorrectTeam(champion);
                setOptions(finalOptions);
            } catch (error) {
                console.error("Failed to load quiz data", error);
            } finally {
                setLoading(false);
            }
        };

        generateQuestion();
    }, [leagueId, season]);

    const getButtonClass = (teamId: number) => {
        if (selectedAnswer === null) {
            return "bg-white border-gray-200 hover:border-amber-400 hover:bg-amber-50 text-gray";
        }

        if (teamId === correctTeam?.teamId) {
            return "bg-green-500 text-white border-green-600";
        }
        if (teamId === selectedAnswer && teamId !== correctTeam?.teamId) {
            return "bg-red-500 text-white border-red-600";
        }

        return "bg-gray-100 text-gray-400 border-gray-200 opacity-50 cursor-not-allowed";
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-amber-500 font-bold animate-pulse">Loading the pitch...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 font-sans">
            <div className="w-full max-w-2xl">

                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-sm text-gray-500 hover:text-black mb-8 transition-colors font-medium"
                >
                    &larr; Back to Dashboard
                </button>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center mb-8">
                    <span className="text-amber-500 font-bold tracking-wider text-sm uppercase mb-2 block">Season {season}</span>
                    <h2 className="text-3xl font-bold text-gray-900">Which team was crowned Champion?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {options.map((team, index) => (
                        <button
                            key={`${team.teamId}-${index}`}
                            onClick={() => setSelectedAnswer(team.teamId)}
                            disabled={selectedAnswer !== null}
                            className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-4 ${getButtonClass(team.teamId)}`}
                        >
                            <img src={team.teamLogo} alt={team.teamName} className="w-16 h-16 object-contain" />
                            <span className="font-semibold text-lg">{team.teamName}</span>
                        </button>
                    ))}
                </div>

                {selectedAnswer !== null && (
                    <div className="mt-8 flex justify-center animate-fade-in">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="bg-black text-white px-8 py-3 rounded-md hover:bg-amber-400 hover:text-black font-semibold transition-colors"
                        >
                            Return to Hub
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}