export const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8 text-gray-900 font-sans">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Pitchside Stats</h1>
                <p className="text-gray-500 mt-2">Select a league to start testing your knowledge.</p>
            </header>

            {/* The CSS Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Grid Card 1 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between h-48">
                    <div>
                        <h2 className="text-xl font-semibold">Premier League</h2>
                        <p className="text-sm text-gray-500 mt-1">England</p>
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                        Start Quiz
                    </button>
                </div>

                {/* Grid Card 2 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between h-48">
                    <div>
                        <h2 className="text-xl font-semibold">Bundesliga</h2>
                        <p className="text-sm text-gray-500 mt-1">Germany</p>
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                        Start Quiz
                    </button>
                </div>

                {/* Grid Card 3 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between h-48">
                    <div>
                        <h2 className="text-xl font-semibold">La Liga</h2>
                        <p className="text-sm text-gray-500 mt-1">Spain</p>
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                        Start Quiz
                    </button>
                </div>

            </div>
        </div>
    );
};