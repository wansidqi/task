import "../AppQuestions.css";

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: 1,
    name: "Alice Johnson",
    score: 10,
    totalQuestions: 10,
    percentage: 100,
  },
  {
    id: 2,
    name: "Bob Smith",
    score: 9,
    totalQuestions: 10,
    percentage: 90,
  },
  {
    id: 3,
    name: "Charlie Brown",
    score: 9,
    totalQuestions: 10,
    percentage: 90,
  },
  {
    id: 4,
    name: "Diana Prince",
    score: 8,
    totalQuestions: 10,
    percentage: 80,
  },
  {
    id: 5,
    name: "Edward Wilson",
    score: 8,
    totalQuestions: 10,
    percentage: 80,
  },
  {
    id: 6,
    name: "Fiona Davis",
    score: 7,
    totalQuestions: 10,
    percentage: 70,
  },
  {
    id: 7,
    name: "George Miller",
    score: 7,
    totalQuestions: 10,
    percentage: 70,
  },
  {
    id: 8,
    name: "Hannah Lee",
    score: 6,
    totalQuestions: 10,
    percentage: 60,
  },
  {
    id: 9,
    name: "Ian Taylor",
    score: 6,
    totalQuestions: 10,
    percentage: 60,
  },
  {
    id: 10,
    name: "Julia Roberts",
    score: 5,
    totalQuestions: 10,
    percentage: 50,
  },
  {
    id: 11,
    name: "Kevin Hart",
    score: 5,
    totalQuestions: 10,
    percentage: 50,
  },
  {
    id: 12,
    name: "Luna Martinez",
    score: 4,
    totalQuestions: 10,
    percentage: 40,
  },
  {
    id: 13,
    name: "Michael Jordan",
    score: 4,
    totalQuestions: 10,
    percentage: 40,
  },
  {
    id: 14,
    name: "Nina Patel",
    score: 3,
    totalQuestions: 10,
    percentage: 30,
  },
  {
    id: 15,
    name: "Oscar Garcia",
    score: 3,
    totalQuestions: 10,
    percentage: 30,
  },
];

export function Leaderboard() {
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return `#${index + 1}`;
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-yellow-700 flex flex-col items-center py-6 md:py-10">
      <div className="p-4 md:p-8 w-full max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-bold text-yellow-400 text-center mb-2 drop-shadow-lg">
          🏆 Quiz Leaderboard 🏆
        </h1>

        {/* Leaderboard Container with scrollable content */}
        <div className="mt-10 md:mt-20 bg-teal-900/50 rounded-2xl p-4 md:p-6 backdrop-blur-sm border border-teal-700">
          <div className="max-h-[400px] md:max-h-[600px] overflow-y-auto pr-1 md:pr-2 scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-teal-800">
            <div className="space-y-4">
              {mockLeaderboardData.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`group relative p-3 md:p-4 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 ${
                    index < 3
                      ? "bg-gradient-to-r from-yellow-600/20 via-yellow-500/20 to-yellow-400/20 border-2 border-yellow-400/30"
                      : "bg-gradient-to-r from-teal-800/40 to-teal-700/40 border-2 border-teal-600/30"
                  }`}
                >
                  {/* Rank and Name */}
                  <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-start">
                    <div className="text-lg md:text-2xl font-bold min-w-[40px] md:min-w-[60px] text-center">
                      {getRankIcon(index)}
                    </div>
                    <div>
                      <h3 className="text-base md:text-xl font-bold text-yellow-300 text-center md:text-left">
                        {entry.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto justify-center md:justify-end">
                    <div className="text-right min-w-[60px] md:min-w-[100px]">
                      <div
                        className={`text-lg md:text-2xl font-bold ${getScoreColor(
                          entry.percentage
                        )}`}
                      >
                        {entry.score}/{entry.totalQuestions}
                      </div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 via-yellow-300/20 to-yellow-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Quiz Button */}
        <div className="flex justify-center mt-6 md:mt-8">
          <button
            onClick={() => window.history.back()}
            className="group relative px-5 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-900 rounded-xl shadow-lg hover:shadow-2xl hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 active:scale-95 transition-all duration-300 font-bold text-base md:text-xl transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-4 md:w-5 h-4 md:h-5 group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              Back to Quiz
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
